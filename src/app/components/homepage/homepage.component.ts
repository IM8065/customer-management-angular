import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Customer, CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  customerList: Customer[] | undefined;
  filter: string | undefined;
  username: string = '';

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public userService: AuthService
  ) {}

  ngOnInit(): void {
    let userDetailsString = localStorage.getItem('userdetails') || '';
    let userDetailsObj = JSON.parse(userDetailsString);
    this.username = userDetailsObj.username;
    this.customerService.getCustomers().subscribe({
      next: (res: Customer[]) => {
        this.customerList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['error-page']);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  searchFilter() {
    this.customerService.getFilteredCustomrs(this.filter).subscribe((res) => {
      this.customerList = res;
      console.log(res);
    });
  }

  delete(id: any) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (res) => {
        this.customerList = this.customerList?.filter((el) => el.id != id);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['error-page']);
      },
    });
  }

  registerCustomer() {
    this.router.navigate(['create-customer']);
  }

  logout() {
    localStorage.removeItem('userdetails');
    this.router.navigate(['login']);
  }

  editCustomer(id: any) {
    this.router.navigate(['edit-customer', id]);
  }

  registerUser() {
    this.router.navigate(['register-user']);
  }

  isEmpty() {
    return this.customerList?.length == 0;
  }

  openMenu() {
    let menuBtn: any = document.querySelector('.menu-btn');
    let menuItems: any = document.querySelector('.menu-items');
    let userDisplay: any = document.querySelector('.user-display');

    userDisplay.classList.toggle('hide');
    menuBtn.classList.toggle('open');
    menuItems.classList.toggle('open');
  }
}
