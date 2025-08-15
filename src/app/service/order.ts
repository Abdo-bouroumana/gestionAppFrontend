import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { APIResponseOrder } from '../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class Order {

  router = inject(Router);

  constructor(private http: HttpClient) {

  }

  getAllOrders(): Observable<APIResponseOrder[]> {
    const token = localStorage.getItem('token');
        if (!token) {
          return throwError(() => new Error('No token found'));
        }
        return this.http.get<APIResponseOrder[]>('http://localhost:8080/orders/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  }

  updateOrderStatus(id: number, status: string){
    debugger;
      const token = localStorage.getItem('token');
        if (!token) {
          return throwError(() => new Error('No token found'));
        }
        return this.http.put(`http://localhost:8080/orders/admin/${id}/status?status=${status}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  }

  createOrder(createOrderForm: any){
    debugger;
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.post("http://localhost:8080/orders", createOrderForm, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  getMyOrders(): Observable<APIResponseOrder[]> {
    const token = localStorage.getItem('token');
        if (!token) {
          return throwError(() => new Error('No token found'));
        }
        return this.http.get<APIResponseOrder[]>('http://localhost:8080/orders/my?page=1&size=1', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  }

  updateOrder(id: number, orderForm: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.put(`http://localhost:8080/orders/${id}`, orderForm, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  cancelOrder(id: number){
    debugger;
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.delete(`http://localhost:8080/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }


}
