import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../login-page/users.service'; // Adjust the path as needed
import { User } from '../../login-page/user.model'; // Adjust the path as needed

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUserData('YOUR_UID_HERE').subscribe(data => {
      this.users = Object.values(data || {});
    });
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.selectedUser) {
      this.usersService.updateUser(this.selectedUser).subscribe(() => {
        this.isEditing = false;
        this.loadUsers(); // Reload the user list to reflect changes
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }
}
