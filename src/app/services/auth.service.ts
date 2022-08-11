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

  urlString: string = 'http://127.0.0.1:7001/CustomerManagment-0.0.1-SNAPSHOT';
  // urlString: string = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient, private router: Router) {}

  authenticateUser(username: string, password: string) {
    let loginObj = { username: username, password: password };

    return this.http.post(
      `${this.urlString}/api/auth/login`,
      loginObj,
      this.httpOptions
    );
  }

  registerUser(user: User) {
    let username =
      JSON.parse(localStorage.getItem('userdetails') || '').username || '';
    let customOptions = {
      headers: new HttpHeaders({
        username: username,
      }),
    };
    return this.http.post(
      `${this.urlString}/api/auth/register`,
      user,
      customOptions
    );
  }

  deleteUser(id: number) {
    console.log(id);
    return this.http.delete(`${this.urlString}/api/auth/${id}`);
  }

  updateUser(id: number, user: User) {
    this.http.patch(
      `${this.urlString}/api/auth/update/${id}`,
      user,
      this.httpOptions
    );
  }

  viewAllUsers() {
    return this.http.get<User[]>(
      `${this.urlString}/api/auth/list`,
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
