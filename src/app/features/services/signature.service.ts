import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import ISignature from 'src/app/shared/models/signature-preview.model';
import firebase from 'firebase/compat/app'
export interface FormState {
  general: any;
  social: any;
  design: any;
}

@Injectable({
  providedIn: 'root'
})

export class SignatureService {
  user: firebase.User | null = null;
  public signCollection: AngularFirestoreCollection<ISignature>;
  private formStateSubject = new BehaviorSubject<FormState>({
    general: null,
    social: null,
    design: null
  });

  formState$ = this.formStateSubject.asObservable();

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
  ) { 
    this.signCollection = db.collection('signature');
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  async createSign(data: ISignature): Promise<void> {
    if (this.user?.uid) {
      await this.signCollection.doc(this.user.uid).set(data);
    }
  }
  
  // Method to update form state
  updateFormState(data: Partial<FormState>) {
    const currentState = this.formStateSubject.value;
    this.formStateSubject.next({ ...currentState, ...data });
  }

  getSignatureFormData(userId: any): Observable<any> {
    return this.getSignatureData().pipe(
      map((res: any) => {
        const userSignatureData = res
          .map((element: any) => ({
            uid: element.payload.doc.id, 
            ...(element.payload.doc.data() as Record<string, unknown>)
          }))
          .find((data: any) => data.uid === userId);
        return userSignatureData;
      })
    );
  }

  getLocalStorageData(): any {
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
  
  getSignatureData(): Observable<any> {
    return this.db.collection('signature').snapshotChanges();
  }
}
