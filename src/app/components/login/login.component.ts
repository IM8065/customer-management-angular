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
  // user: User = new User('', '');
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  errorMessage: string = '';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    let user: User = {
      username: this.userForm.controls['username'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value,
    };
    this.auth
      .authenticateUser(user.username, user.password)
      .subscribe((res: any) => {
        try {
          if (res.password == user.password) {
            let resJSON = JSON.stringify(res);
            localStorage.setItem('userdetails', resJSON);
            this.router.navigate(['homepage']);
          } else {
            this.errorMessage = 'Username or password are incorrect';
          }
        } catch (e) {
          this.errorMessage = 'Could not find user';
        }
      });
  }
}
