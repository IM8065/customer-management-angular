import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer, CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  success: boolean = false;
  error: boolean = false;
  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    balance: new FormControl('', [Validators.required, Validators.min(0)]),
  });
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create() {
    let customer: Customer = {
      firstName: this.customerForm.controls['firstName'].value,
      lastName: this.customerForm.controls['lastName'].value,
      address: this.customerForm.controls['address'].value,
      email: this.customerForm.controls['email'].value,
      balance: this.customerForm.controls['balance'].value,
      user: JSON.parse(localStorage.getItem('userdetails') || ''),
    };

    console.log(customer);

    this.customerService.createCustomer(customer).subscribe({
      next: (res) => {
        this.customerForm.reset();
        this.success = true;
        setTimeout(() => {
          this.success = false;
          this.router.navigate(['homepage']);
        }, 2000);
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
