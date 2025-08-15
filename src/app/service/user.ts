import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { APIResponseUser } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class User {

  router = inject(Router);

  constructor(private http: HttpClient) {

  }

  onLogin(loginForm: any) {
    debugger;
    const loginTime = new Date();
    const formValues = loginForm.value;
    this.http.post("http://localhost:8080/auth/login", formValues).subscribe({

      next: (res: any) => {
        debugger;
        localStorage.setItem('loginDateTime', `${loginTime.toLocaleDateString('en-US', { month: 'long' })} ${loginTime.getDate()}, ${loginTime.getFullYear()} at ${loginTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`);
        localStorage.setItem('token', res.token);
        localStorage.setItem('leaveUser', JSON.stringify(res.user));
        if (res.user.role === 'ADMIN') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/user');
        }

        console.log(res.token);
      },
      error: (e) => {
        debugger;
        alert('Something went wrong');
      }
    })
  }

  getAllUsers(): Observable<APIResponseUser[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.get<APIResponseUser[]>('http://localhost:8080/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  OnCreateUser(createUserForm: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.post('http://localhost:8080/admin/users', createUserForm, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateUser(id: number, updateUserForm: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.put(`http://localhost:8080/admin/users/${id}`, updateUserForm, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteUser(id: number){
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    } 
    return this.http.delete(`http://localhost:8080/admin/users/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  }


}
