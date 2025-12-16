import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type LoginError = 'network' | 'invalid';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  errorMessage: string | null = null;
  isSubmitting : boolean = false;
  form = new FormGroup({
  username: new FormControl ('',Validators.required),
  password: new FormControl ('',Validators.required)
});
logingErrorMessage (err:LoginError) : string | null {
  if(err === 'network'){
    return "تحقق من الإنترنت";
  }
  else if (err === 'invalid'){
    return "بيانات الدخول غير صحيحة";
  }
  return null;
}
onSubmit(){
  if (this.isSubmitting) return;
  this.errorMessage = null;


  if (this.form.invalid){
    this.form.markAllAsTouched();

    return;
  }

  this.isSubmitting = true;
  const err : LoginError = 'invalid';
  this.errorMessage = this.logingErrorMessage(err);

  setTimeout(()=>{
    this.isSubmitting = false;
  },1000);
}
}
