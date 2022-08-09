import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  success: boolean = false;
  error: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    let user: User = {
      username: this.userForm.controls['username'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value,
    };
    this.auth.authenticateUser(user.username, user.password).subscribe({
      next: (res: any) => {
        if (res.password == user.password) {
          this.success = true;
          let resJSON = JSON.stringify(res);
          localStorage.setItem('userdetails', resJSON);
          console.log(res);
          setTimeout(() => {
            this.success = false;
            this.router.navigate(['homepage']);
          }, 2000);
        }
      },
      error: (e) => {
        this.error = true;

        console.log(e);
      },
    });
  }
}
