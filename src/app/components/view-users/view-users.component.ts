import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  users: User[] | undefined;
  constructor(public userService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userService.viewAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['error-page']);
      },
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.users = this.users?.filter((el) => el.id != id);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
