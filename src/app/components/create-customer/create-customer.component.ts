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
    };

    this.customerService.createCustomer(customer).subscribe((res) => {
      this.customerForm.reset();
      this.router.navigate(['homepage']);
    });
  }
}
