import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  success: boolean = false;
  error: boolean = false;
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    let user: User = {
      username: this.userForm.controls['username'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value,
    };
    console.log(user);
    this.authService.registerUser(user).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['homepage']);
          }, 2000);
        }
      },
      error: (e) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      },
    });
  }
}
