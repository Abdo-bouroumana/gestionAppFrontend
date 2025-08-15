import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Order } from '../../../service/order';
import { APIResponseOrder } from '../../../models/Order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-order',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-order.html',
  styleUrl: './update-order.css'
})
export class UpdateOrder implements OnInit {
  orderService = inject(Order);
  orders: APIResponseOrder[] = [];
  editingOrderId: number | null = null;
  originalData: { [key: number]: any } = {};
  
  orderForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    type: new FormControl(""),
    quantity: new FormControl(),
    comment: new FormControl("")
  });

  ngOnInit() {
    this.loadMyOrders();
  }

  loadMyOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.showToast('Error loading orders', 'danger');
      }
    });
  }

  startEdit(order: APIResponseOrder) {
    this.editingOrderId = order.id;
    this.originalData[order.id] = {
      title: order.title,
      type: order.type,
      quantity: order.quantity,
      comment: order.comment
    };
  }

  saveEdit(order: APIResponseOrder) {
    const updatedOrder = {
      title: order.title,
      type: order.type,
      quantity: order.quantity,
      comment: order.comment
    };

    this.orderService.updateOrder(order.id, updatedOrder).subscribe({
      next: () => {
        this.editingOrderId = null;
        delete this.originalData[order.id];
        this.showToast('Order updated successfully!', 'success');
      },
      error: (error) => {
        console.error('Error updating order:', error);
        this.showToast('Error updating order', 'danger');
      }
    });
  }

  cancelEdit(order: APIResponseOrder) {
    if (this.originalData[order.id]) {
      order.title = this.originalData[order.id].title;
      order.type = this.originalData[order.id].type;
      order.quantity = this.originalData[order.id].quantity;
      order.comment = this.originalData[order.id].comment;
    }
    this.editingOrderId = null;
    delete this.originalData[order.id];
  }

  isEditing(orderId: number): boolean {
    return this.editingOrderId === orderId;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  }

  onCancelOrder(id: number){
    debugger;
    if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      this.orderService.cancelOrder(id).subscribe({
        next: () => {
          this.showToast('Order cancelled successfully!', 'success');
          this.loadMyOrders(); // Refresh the order list
        },
        error: (error) => {
          console.error('Error cancelling order:', error);
          this.showToast('Error cancelling order', 'danger');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  showToast(message: string, type: string) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
      ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
  }
}
