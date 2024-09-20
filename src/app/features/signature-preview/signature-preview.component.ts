import { Component } from '@angular/core';
import { FormState, SignatureService } from '../services/signature.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import { CopySignatureService } from '../services/copy-signature.service';

@Component({
  selector: 'app-signature-preview',
  templateUrl: './signature-preview.component.html',
  styleUrls: ['./signature-preview.component.css']
})
export class SignaturePreviewComponent {
  signaturePreviewText!: string;
  formData!: FormState;
  user: firebase.User | null = null;
  data:any;
  showSuccess = false;
  showSuccessMessage = '';
  alertColor = 'primary';
  localStorageData:any;
  images = {
    linkedin: 'assets/images/linkdin.jpeg',
    facebook: 'assets/images/youtube.png',
    instagram: 'assets/images/instagram.png',
    youtube: 'assets/images/linkedin.png'
  };
  constructor(
      private _signatureService: SignatureService,
      private _auth: AngularFireAuth,
      private _router: Router,
      private _copySignatureService: CopySignatureService
    ) {
      _auth.user.subscribe(user => this.user = user)
    }

  ngOnInit(): void {
    // get data from local storage
    this.localStorageData=this._signatureService.getLocalStorageData();

    this._signatureService.formState$.subscribe(data => {
      if(data && this.hasValidFormData(data)){
        this.formData = data || this.localStorageData;
      }else{
        this.signaturePreviewText = "Your personalized email signature will be displayed here after entering your details.";
      }
    });
  }
  // Helper method to check if form data has meaningful content
  hasValidFormData(data: FormState): boolean {
    return (
      data.general && Object.keys(data.general).length > 0 ||
      data.social && Object.keys(data.social).length > 0 ||
      data.design && Object.keys(data.design).length > 0
    );
  }
  async onSubmit(){
    console.log(this.data)
    
    this.data = {
      uid: this.user?.uid as string,

      basicForm: {
        ...this.formData.general
      },
      socialMedia: {
        ...this.formData.social
      },
      designForm: {
        ...this.formData.design
      }
    }
    
    try {
      await this._signatureService.createSign(this.data)
      this.showSuccessMessage = "Success! New signature has been saved."
      this.showSuccess = true
      this.alertColor = "primary"
      setTimeout(()=>{
        this.showSuccess = false
      },2000)
    } catch(e) {      
      this.showSuccessMessage = "An unexpected error occurred. Please try again later";
      this.alertColor = 'danger ';
    }
    if (!this.user?.uid) {
      localStorage.setItem("data", JSON.stringify(this.data));
      this._router.navigateByUrl('/login');
      return;
    }
  }

  copySignature(): void {
    this._copySignatureService.copyToClip('email-signature'); // Call the service method

    this.showSuccess = true;
    this.showSuccessMessage = "Success! Signature has been copied.";
    this.alertColor = "primary";

    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }
}
