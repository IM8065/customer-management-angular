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
    return this.http.post(
      'http://localhost:8080/api/auth/register',
      user,
      this.httpOptions
    );
  }

  deleteUser(id: number) {
    console.log(id);
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

  isLoggedIn(): boolean {
    if (localStorage.getItem('userdetails')) {
      return true;
    }
    return false;
  }
}
