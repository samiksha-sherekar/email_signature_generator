import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignatureService } from '../services/signature.service';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  generalForm!: FormGroup;
  user: firebase.User | null = null;

  constructor(
      private _signatureService: SignatureService,
      private auth: AngularFireAuth,
    ){
      
    // General Form Initialization
    this.generalForm = new FormGroup({
      fName: new FormControl<string | null>(null, [Validators.minLength(3), Validators.maxLength(30)]),
      lName: new FormControl<string | null>(null, [Validators.minLength(3), Validators.maxLength(30)]),
      position: new FormControl<string | null>(null, [Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl<string | null>(null, [Validators.email]),
      mobileNo: new FormControl<string | null>(null, [Validators.pattern('^[0-9]{10}$')]),
    });
  }

  ngOnInit(){
    this.generalForm.valueChanges.subscribe(value => {
      this._signatureService.updateFormState({ general: value });
    });
    this.auth.user.subscribe(user => {
      this.user = user;
      if(this.user){
        this.getBasicForm();
      }
    });
  }

  getBasicForm() {
    let data= this._signatureService.getLocalStorageData()
    this._signatureService.getSignatureFormData(this.user?.uid).subscribe((generalForm) => {
      if (generalForm || data.basicForm) {
        var getForm=generalForm|| data;
        this.generalForm.patchValue({
          fName: getForm.basicForm.fName || '',
          lName: getForm.basicForm.lName || '',
          email: getForm.basicForm.email || '',
          mobileNo: getForm.basicForm.mobileNo || '',
          position: getForm.basicForm.position || ''
        });
      } else {
        console.warn("No general found for user.");
      }
    });
  }
  
}
