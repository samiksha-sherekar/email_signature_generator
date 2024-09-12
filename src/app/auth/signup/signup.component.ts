import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from 'src/app/features/services/auth.service';
import IUser from 'src/app/shared/models/user.mode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showpassword=false;

  constructor(private auth: AuthService,private router: Router){}
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl <number | null>(null, [
    Validators.required,
    Validators.max(120)
  ])
  password = new  FormControl('', [
    Validators.required,Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)])
  // confirm_password = new FormControl('', [
  //   Validators.required,
  // ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]{10}')
  ])
  year: number = new Date().getFullYear();
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'primary'
  inSubmission = false
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    // confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })
  get f() { return this.registerForm.controls; }

  async register() {
    this.inSubmission=true
    if (this.registerForm.invalid) {
      return}
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'primary';
    const {email, password}=this.registerForm.value

    try{
      await this.auth.createUser(this.registerForm.value as IUser);
      this.alertMsg = "Success! Your account has been created."
      this.alertColor = "success";
      this.router.navigate(['/email-signature'])
    }catch(e){
      const error = e as FirebaseError;
    // Check if the error is due to the email already being in use
    if (error.code === 'auth/email-already-in-use') {
      this.alertMsg = "This email is already registered. Please use a different email.";
    } else {
      this.alertMsg = "An unexpected error occurred. Please try again later.";
    }
    this.alertColor = 'danger';
    this.inSubmission = false;
    }
    
  }
}
