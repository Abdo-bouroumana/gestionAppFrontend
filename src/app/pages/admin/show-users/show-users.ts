import { Component, inject, OnInit } from '@angular/core';
import {User as UserService} from '../../../service/user'
import { APIResponseUser } from '../../../models/User.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './show-users.html',
  styleUrl: './show-users.css'
})
export class ShowUsers implements OnInit{
  userService = inject(UserService);
  userList: APIResponseUser[] = [];
  filteredUsers: APIResponseUser[] = [];

  filterUsername: string = '';
  filterEmail: string = '';
  filterRole: string = '';
  filterActive: string = '';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (res: APIResponseUser[]) => {
        this.userList = res;
        this.filteredUsers = res;
        console.log(this.userList)
      }
    })
  }

  applyUserFilters() {
    this.filteredUsers = this.userList.filter(user => {
      const usernameMatch = this.filterUsername ? user.username.toLowerCase().includes(this.filterUsername.toLowerCase()) : true;
      const emailMatch = this.filterEmail ? user.email.toLowerCase().includes(this.filterEmail.toLowerCase()) : true;
      const roleMatch = this.filterRole ? user.role.toLowerCase() === this.filterRole.toLowerCase() : true;
      const activeMatch = this.filterActive ? String(user.isActive) === this.filterActive : true;
      return usernameMatch && emailMatch && roleMatch && activeMatch;
    });
  }

  clearFilters() {
    this.filterUsername = '';
    this.filterEmail = '';
    this.filterRole = '';
    this.filterActive = '';
    this.filteredUsers = this.userList;
  }
}
