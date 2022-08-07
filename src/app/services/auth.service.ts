import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  showUsers: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  authenticateUser(username: string, password: string) {
    const url = 'http://localhost:8080/api/auth/login';
    let loginObj = { username: username, password: password };

    return this.http.post(url, loginObj, this.httpOptions);
  }

  registerUser(user: User) {
    try {
      return this.http
        .post('http://localhost:8080/api/auth/register', user, this.httpOptions)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            let resJSON = JSON.stringify(res);
            localStorage.setItem('userdetails', resJSON);
            this.router.navigate(['homepage']);
          }
        });
    } catch (e) {
      return 'An error occured, please try again later.';
    }
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8080/api/auth/${id}`);
  }

  updateUser(id: number, user: User) {
    this.http.patch(
      `http://localhost:8080/api/auth/update/${id}`,
      user,
      this.httpOptions
    );
  }

  viewAllUsers() {
    return this.http.get<User[]>(
      `http://localhost:8080/api/auth/list`,
      this.httpOptions
    );
  }

  toggleViewUsers() {
    this.showUsers = !this.showUsers;
  }
}
