import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import IUser from 'src/app/shared/models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection : AngularFirestoreCollection<IUser>
  public isAuthenticated$ : Observable<boolean>
  public isAuthenticatedWithDelay$ :Observable<boolean>

  constructor( 
        private auth: AngularFireAuth,
        private db : AngularFirestore
      ){

      this.userCollection = db.collection("users")

      this.auth.user.subscribe(console.log);
      this.isAuthenticated$ = auth.user.pipe(
        map(user => !! user)
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(100)
      )
    }

    public async createUser(userData :IUser){
      if(!userData.password){
        throw new Error("Password not provided");
      }
      const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
      if(!userCred.user){
        throw new Error("User can't be found");
      }
      await this.userCollection.doc(userCred.user?.uid).set({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber
      })
      await userCred.user.updateProfile({
        displayName: userData.name
      })
    }
}
