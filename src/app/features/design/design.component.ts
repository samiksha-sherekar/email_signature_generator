import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignatureService } from '../services/signature.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent {
  designForm!: FormGroup;
  user: firebase.User | null = null;

  constructor(
      private _signatureService: SignatureService,
      private auth: AngularFireAuth,
    ){
      
    // Design Form Initialization
    this.designForm = new FormGroup({
      fontFamily: new FormControl<string | null>(null),
      fontSize: new FormControl<string | null>(null),
      templateColor: new FormControl<string | null>(null),
      backgroundColor: new FormControl<string | null>('#FFFFFF'),
    });
  }

  ngOnInit(){
    this.designForm.valueChanges.subscribe(value => {
      this._signatureService.updateFormState({ design: value });
    });
    this.auth.user.subscribe(user => {
      this.user = user;
      if(this.user){
        this.getDesignForm();
      }
    });
  }

  getDesignForm() {
    let data= this._signatureService.getLocalStorageData()
    this._signatureService.getSignatureFormData(this.user?.uid).subscribe((designForm) => {
      if (designForm ||data.designForm) {
        var getForm= designForm|| data;
        this.designForm.patchValue({
          fontFamily: getForm.designForm.fontFamily || '',
          fontSize: getForm.designForm.fontSize || '',
          templateColor: getForm.designForm.templateColor || '',
          backgroundColor: getForm.designForm.backgroundColor || ''
        });
      } else {
        console.warn("No Design Form found for user.");
      }
    });
  }
  
}