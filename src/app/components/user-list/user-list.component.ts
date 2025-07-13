import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users.';
        this.loading = false;
      }
    });
  }
  deleteUser(name: string): void {
    if (confirm(`Are you sure you want to delete user "${name}"?`)) {
      this.userService.deleteUser(name).subscribe({
        next: () => this.loadUsers(),
        error: () => alert('Failed to delete user.')
      });
    }
  }
}
