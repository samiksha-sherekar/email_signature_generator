import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignatureService } from '../services/signature.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  socialForm!: FormGroup;
  user: firebase.User | null = null;

  constructor(
      private _signatureService: SignatureService,
      private auth: AngularFireAuth,
    ){
      
    // Social Form Initialization
    this.socialForm = new FormGroup({
      linkedinLink: new FormControl<string | null>(null, Validators.pattern('^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$')),
      facebookLink: new FormControl<string | null>(null, Validators.pattern('^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$')),
      instagramLink: new FormControl<string | null>(null, Validators.pattern('^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$')),
      youtubeLink: new FormControl<string | null>(null, Validators.pattern('^(https?:\/\/)?(www\.)?(youtube\.com\/(channel|user)\/[A-Za-z0-9_-]+)\/?$')),
    });
  }

  ngOnInit(){
    this.socialForm.valueChanges.subscribe(value => {
      this._signatureService.updateFormState({ social: value });
    });
    this.auth.user.subscribe(user => {
      this.user = user;
      if(this.user){
        this.getSocialForm();
      }
    });
  }

  getSocialForm() {
    let data= this._signatureService.getLocalStorageData();
    this._signatureService.getSignatureFormData(this.user?.uid).subscribe((socialForm) => {
      if (socialForm ||data.designForm) {
        var getForm = socialForm|| data;
        this.socialForm.patchValue({
          linkedinLink: getForm.socialMedia.linkedinLink || '',
          facebookLink: getForm.socialMedia.facebookLink || '',
          instagramLink: getForm.socialMedia.instagramLink || '',
          youtubeLink: getForm.socialMedia.youtubeLink || ''
        });
      } else {
        console.warn("No social found for user.");
      }
    });
  }
  
}