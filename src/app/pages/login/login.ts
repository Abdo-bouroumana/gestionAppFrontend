import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../service/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(User)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  }) 

  onLogin(){
    this.userService.onLogin(this.loginForm);
  }


}
