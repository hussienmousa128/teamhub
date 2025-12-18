import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { finalize } from 'rxjs';
import { AppError } from '../../../../core/http/app-error.model';

export type LoginError = 'network' | 'invalid';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private router : Router ,private auth : AuthService){}

  errorMessage: string | null = null;
  isSubmitting : boolean = false;
  form = new FormGroup({
  username: new FormControl ('',Validators.required),
  password: new FormControl ('',[Validators.required,Validators.minLength(6)]),
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

  const payload = {
    username : this.form.controls.username.value ?? "",
    password : this.form.controls.password.value ?? ""

  };
  this.auth.login(payload).pipe(finalize(()=> this.isSubmitting = false))
  .subscribe({
    next: ()=> this.router.navigateByUrl('/app/users'),
    error: (e : AppError)=> {

      const type: LoginError = (e?.status === 400 || e?.status === 401) ? 'invalid' : 'network';
      this.errorMessage = this.logingErrorMessage(type);

    }
  });
}
}
