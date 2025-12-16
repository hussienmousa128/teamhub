import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';




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
onSubmit(){
  if (this.isSubmitting) return;
  this.errorMessage=null;

  if (this.form.invalid){
    this.form.markAllAsTouched();

    return;
  }

  this.isSubmitting = true;
  this.errorMessage ="البيانات المدخلة غير صحيحة";

  setTimeout(()=>{
    this.isSubmitting = false;
  },1000);
}
}
