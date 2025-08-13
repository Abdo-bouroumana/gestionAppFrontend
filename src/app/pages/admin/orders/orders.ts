import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Order as OrderService } from '../../../service/order';
import { APIResponseOrder } from '../../../models/Order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit{

  orderService = inject(OrderService);

  orderList: APIResponseOrder[] = [];
  filteredOrders: APIResponseOrder[] = [];
  selectedValue: any;
  elements_ids: number[] = [];

  // Filter properties
  filterUser: string = '';
  filterTitle: string = '';
  filterType: string = '';
  filterStatus: string = '';
  filterDeleted: string = '';

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
          next: (res: APIResponseOrder[]) => {
            this.orderList = res;
            this.filteredOrders = res;
            console.log(this.orderList)
          }
        });
  }

  editStatus(event: Event) {
    const button = event.target as HTMLElement;
    const statusControls = button.closest('.status-controls');
    if (!statusControls) return;
    const statusDisplay = statusControls.querySelector('.status-display');
    const statusEdit = statusControls.querySelector('.status-edit');
    if (statusDisplay && statusEdit) {
      statusDisplay.classList.add('editing');
      statusEdit.classList.add('active');
    }
  }

  cancelEdit(event: Event) {
    const button = event.target as HTMLElement;
    const statusControls = button.closest('.status-controls');
    if (!statusControls) return;
    const statusDisplay = statusControls.querySelector('.status-display');
    const statusEdit = statusControls.querySelector('.status-edit');
    if (statusDisplay && statusEdit) {
      statusDisplay.classList.remove('editing');
      statusEdit.classList.remove('active');
      // Reset select to original value
      const originalStatus = statusDisplay.querySelector('.status-badge')?.textContent?.trim();
      const select = statusEdit.querySelector('.status-select') as HTMLSelectElement;
      const statusMap: any = {
        'En Cours': 'EN_COURS',
        'Confirmée': 'CONFIRMEE',
        'Livrée': 'LIVREE',
        'Annulée': 'ANNULEE'
      };
      if (select && originalStatus && statusMap[originalStatus]) {
        select.value = statusMap[originalStatus];
      }
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  confirmStatus(event: Event) {
    const button = event.target as HTMLElement;
    const statusControls = button.closest('.status-controls');
    if (!statusControls) return;
    const statusDisplay = statusControls.querySelector('.status-display');
    const statusEdit = statusControls.querySelector('.status-edit');
    const select = statusEdit?.querySelector('.status-select') as HTMLSelectElement;
    const statusBadge = statusDisplay?.querySelector('.status-badge') as HTMLElement;
    if (select && statusBadge && statusDisplay && statusEdit) {
      const newValue = select.value;
      const statusLabels: any = {
        'EN_COURS': 'En Cours',
        'CONFIRMEE': 'Confirmée',
        'LIVREE': 'Livrée',
        'ANNULEE': 'Annulée'
      };
      const statusClasses: any = {
        'EN_COURS': 'status-en-cours',
        'CONFIRMEE': 'status-confirmee',
        'LIVREE': 'status-livree',
        'ANNULEE': 'status-annulee'
      };
      // Update badge text and class
      statusBadge.textContent = statusLabels[newValue];
      statusBadge.className = `status-badge ${statusClasses[newValue]}`;
      // Hide edit mode
      statusDisplay.classList.remove('editing');
      statusEdit.classList.remove('active');
      console.log('Status updated to:', newValue);
      // TODO: Make API call to update status here
    }
  }

  updateStatus(ind: number){
    debugger;
    this.orderService.updateOrderStatus(ind, this.selectedValue).subscribe({
          next: () => {
            alert("status updated successfully")
          },
          error:() => {
            alert("something went wrong");
          }
        });
  }

  applyOrderFilters() {
    this.filteredOrders = this.orderList.filter(order => {
      const userMatch = this.filterUser ? order.userName?.toLowerCase().includes(this.filterUser.toLowerCase()) : true;
      const titleMatch = this.filterTitle ? order.title?.toLowerCase().includes(this.filterTitle.toLowerCase()) : true;
      const typeMatch = this.filterType ? order.type === this.filterType : true;
      const statusMatch = this.filterStatus ? order.status === this.filterStatus : true;
      const deletedMatch = this.filterDeleted ? String(order.deleted) === this.filterDeleted : true;
      return userMatch && titleMatch && typeMatch && statusMatch && deletedMatch;
    });
  }

  clearOrderFilters() {
    this.filterUser = '';
    this.filterTitle = '';
    this.filterType = '';
    this.filterStatus = '';
    this.filterDeleted = '';
    this.filteredOrders = this.orderList;
  }
}
