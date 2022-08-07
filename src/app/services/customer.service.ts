import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  parameters = new HttpParams();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(
      'http://localhost:8080/api/customer/create',
      customer,
      this.httpOptions
    );
  }

  deleteCustomer(id: number) {
    console.log(id);
    return this.http.delete(`http://localhost:8080/api/customer/${id}`);
  }

  viewCustomer(id: number) {
    let customer = this.http
      .get<Customer>(`http://localhost:8080/api/customer/get/${id}`)
      .pipe(take(1));

    return customer;
  }

  getCustomers() {
    return this.http.get<Customer[]>('http://localhost:8080/api/customer/list');
  }

  getFilteredCustomrs(filterString: any) {
    return this.http.get<Customer[]>(
      `http://localhost:8080/api/customer/listFilter?filter=${filterString}`,
      this.httpOptions
    );
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.patch(
      `http://localhost:8080/api/customer/update/${id}`,
      customer,
      this.httpOptions
    );
  }
}
