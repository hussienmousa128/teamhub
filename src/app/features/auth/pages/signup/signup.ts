import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../../core/auth/auth.models';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppError } from '../../../../core/http/app-error.model';
import { LoginError } from '../login/login';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: any;

constructor(private fb: FormBuilder , private authService : AuthService,private router : Router) {
  this.signupForm = this.fb.group({
    name: ['', Validators.required], // Name field
    email: ['', [Validators.required, Validators.email]], // Email field with validation
    password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    userType: ['', Validators.required] // Select for user type
  });
}

  isSubmitting : boolean = false;
signupErrorMessage (err:LoginError) : string | null {
  if(err === 'network'){
    return "تحقق من الإنترنت";
  }
  else if (err === 'invalid'){
    return "بيانات الدخول غير صحيحة";
  }
  return null;
}
onSubmit(){
  if(this.signupForm.invalid){
    this.signupForm.markAllAsTouched();
    return;
  }
  const userData : RegisterRequest = this.signupForm.value;
  this.authService.registerUser(userData).subscribe({
    next: ()=> this.router.navigateByUrl('/auth/login'),
    error: (e : AppError)=> {

          const type: LoginError = (e?.status === 400 || e?.status === 401) ? 'invalid' : 'network';
          this.errorMessage = this.signupErrorMessage(type);
  }});
}


}
