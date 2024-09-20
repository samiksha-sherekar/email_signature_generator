import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: firebase.User | null = null;

  constructor(
      private afAuth: AngularFireAuth,
      private _router: Router
    ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => this.user = user)
  }

  async logout($event:Event){
    $event.preventDefault();
    await this.afAuth.signOut().then(() => {
      this._router.navigateByUrl('/login')
    });
  }
}
