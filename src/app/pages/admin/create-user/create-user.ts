import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../service/user';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css'
})
export class CreateUser {

  userService = inject(User)

  createUserForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    username: new FormControl(""),
    role: new FormControl(""),
    password: new FormControl(""),
    isActive: new FormControl("")
  })


  onCreateUser(){
    const formValue = this.createUserForm.value;
    this.userService.OnCreateUser(formValue).subscribe({
      next:() => {
        alert('User created successfully');
      },
      error:() => {
        alert('Something went wrong');
      }
    });
  }
  

  

}
