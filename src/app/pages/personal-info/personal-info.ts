import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  imports: [],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css'
})
export class PersonalInfo {

  personalInfoString = localStorage.getItem('leaveUser');
  loginDateTime = localStorage.getItem('loginDateTime')

  
  personalInfo = this.personalInfoString ? JSON.parse(this.personalInfoString) : null;
   

}
