import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { timeout } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isSubmitting : boolean = false;
form = new FormGroup({
  username: new FormControl ('',Validators.required),
  password: new FormControl ('',Validators.required)
});
onSubmit(){
  if (this.isSubmitting) return;

  if (this.form.invalid){
    this.form.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  console.log(this.form.value);

  setTimeout(()=>{
    this.isSubmitting = false;
  },1000);



}
}
