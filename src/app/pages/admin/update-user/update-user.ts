import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../../../service/user';
import { APIResponseUser } from '../../../models/User.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css'
})
export class UpdateUser implements OnInit {
  userService = inject(User);
  users: APIResponseUser[] = [];
  editingUserId: number | null = null;
  originalData: { [key: number]: any } = {};
  
  userForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    email: new FormControl(""),
    role: new FormControl(""),
    isActive: new FormControl()
  });

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.showToast('Error loading users', 'danger');
      }
    });
  }

  onDeleteUser(id: number){
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.showToast('User deleted successfully!', 'success');
          this.loadAllUsers(); // Refresh the user list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showToast('Error deleting user', 'danger');
        }
      });
    }
  }

  startEdit(user: APIResponseUser) {
    this.editingUserId = user.id;
    this.originalData[user.id] = {
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    };
  }

  saveEdit(user: APIResponseUser) {
    const updatedUser = {
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    };

    this.userService.updateUser(user.id, updatedUser).subscribe({
      next: () => {
        this.editingUserId = null;
        delete this.originalData[user.id];
        this.showToast('User updated successfully!', 'success');
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.showToast('Error updating user', 'danger');
      }
    });
  }

  cancelEdit(user: APIResponseUser) {
    if (this.originalData[user.id]) {
      user.username = this.originalData[user.id].username;
      user.email = this.originalData[user.id].email;
      user.role = this.originalData[user.id].role;
      user.isActive = this.originalData[user.id].isActive;
    }
    this.editingUserId = null;
    delete this.originalData[user.id];
  }

  isEditing(userId: number): boolean {
    return this.editingUserId === userId;
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'status-admin';
      case 'user':
        return 'status-user';
      case 'moderator':
        return 'status-moderator';
      default:
        return 'status-user';
    }
  }

  getActiveClass(isActive: boolean): string {
    return isActive ? 'status-active' : 'status-inactive';
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
