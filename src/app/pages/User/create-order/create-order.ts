import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order as OrderService } from '../../../service/order';

@Component({
  selector: 'app-create-order',
  imports: [ReactiveFormsModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css'
})
export class CreateOrder {


  orderService = inject(OrderService);

  orderForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    type: new FormControl(""),
    quantity: new FormControl(),
    comment: new FormControl("")
  })

  onCreateOrder(){
    debugger;
    const orderFormValue = this.orderForm.value;
    console.log('Creating order with token:', localStorage.getItem('token'));
    console.log('Order data:', orderFormValue);
    
    this.orderService.createOrder(orderFormValue).subscribe({
      next:()=>{
        alert("order created successfully");
        this.orderForm.reset();
      },
      error:(error)=>{
        console.error('Order creation error:', error);
        if (error.status === 403) {
          alert("Access denied. Please check if you're logged in with the correct permissions.");
        } else {
          alert("Something went wrong: " + (error.message || 'Unknown error'));
        }
      }
    })
  }



}
