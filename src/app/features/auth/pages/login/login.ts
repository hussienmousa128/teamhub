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
form = new FormGroup({
  username: new FormControl ('',Validators.required),
  password: new FormControl ('',Validators.required)
});
onSubmit(){
  if (this.form.invalid){
    this.form.markAllAsTouched();
    return;
  }
  console.log(this.form.value);
}
}
