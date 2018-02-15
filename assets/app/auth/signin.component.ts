import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  signinForm: FormGroup;
  constructor (private authService: AuthService, private router: Router) {};
  onSubmit () {
    // console.log(this.signupForm);
    const user = new User(this.signinForm.value.email, this.signinForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          //use browser local storage to store data in browser, will persist even after closing browser
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          //go back to root after login
          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      )
    this.signinForm.reset();
  }
  
  ngOnInit () {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    })
  }
}