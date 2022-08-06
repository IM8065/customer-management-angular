import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  currentCustomer: Customer | undefined;

  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    balance: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    this.customerService.viewCustomer(Number(customerId)).subscribe((res) => {
      this.currentCustomer = res;
    });
  }

  updateCustomer() {
    let updatedCustomer: Customer = {
      firstName: this.customerForm.controls['firstName'].value,
      lastName: this.customerForm.controls['lastName'].value,
      address: this.customerForm.controls['address'].value,
      email: this.customerForm.controls['email'].value,
      balance: this.customerForm.controls['balance'].value,
    };
    this.customerService
      .updateCustomer(this.currentCustomer?.id || 0, updatedCustomer)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['homepage']);
      });
  }
}
