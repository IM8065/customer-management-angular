import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';
import { User } from '../User';

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  balance: number;
  user?: User;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  parameters = new HttpParams();

  urlString: string = 'http://127.0.0.1:7001/CustomerManagment-0.0.1-SNAPSHOT';
  // urlString: string = 'http://127.0.0.1:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer) {
    let username =
      JSON.parse(localStorage.getItem('userdetails') || '').username || '';

    let customOptions = {
      headers: new HttpHeaders({
        username: username,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Customer>(
      `${this.urlString}/api/customer/create`,
      customer,
      customOptions
    );
  }

  deleteCustomer(id: number) {
    console.log(id);
    let username =
      JSON.parse(localStorage.getItem('userdetails') || '').username || '';

    let customOptions = {
      headers: new HttpHeaders({
        username: username,
      }),
    };
    return this.http.delete(
      `${this.urlString}/api/customer/${id}`,
      customOptions
    );
  }

  viewCustomer(id: number) {
    let customer = this.http
      .get<Customer>(`${this.urlString}/api/customer/get/${id}`)
      .pipe(take(1));

    return customer;
  }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.urlString}/api/customer/list`);
  }

  getFilteredCustomrs(filterString: any) {
    return this.http.get<Customer[]>(
      `${this.urlString}/api/customer/listFilter?filter=${filterString}`,
      this.httpOptions
    );
  }

  updateCustomer(id: number, customer: Customer) {
    let username =
      JSON.parse(localStorage.getItem('userdetails') || '').username || '';

    let customOptions = {
      headers: new HttpHeaders({
        username: username,
      }),
    };
    return this.http.patch(
      `${this.urlString}/api/customer/update/${id}`,
      customer,
      customOptions
    );
  }
}
