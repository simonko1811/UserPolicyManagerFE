import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User = {
    name: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    organizationUnit: [],
    birthDate: '2000-01-01',
    registeredOn: new Date().toISOString().split('T')[0],
    policies: []
  };

  unitsInput = '';
  isEditMode = false;
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.isEditMode = true;
      this.userService.getUser(name).subscribe(user => {
        this.user = user;
        this.unitsInput = user.organizationUnit.join(', ');
      });
    }
  }

  onSubmit(): void {
    this.user.organizationUnit = this.unitsInput.split(',').map(u => u.trim());

    const action = this.isEditMode
      ? this.userService.updateUser(this.user.name, this.user)
      : this.userService.addUser(this.user);

    action.subscribe({
      next: () => {
        this.router.navigate(['/users']);
        console.log("User created: ", this.user.name);
      },
      error: () => this.message = 'Error saving user.'
    });
  }
}