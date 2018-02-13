import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  signupForm: FormGroup;
  
  onSubmit () {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  
  ngOnInit () {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    })
  }
}