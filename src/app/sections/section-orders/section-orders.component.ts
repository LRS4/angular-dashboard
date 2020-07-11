import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.scss']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _salesData: SalesDataService) { }

  orders: any;
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit)
      .subscribe(res => {
        // console.log("Result from getOrders method: ", res);
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      });
  }

  goToPrevious(): void {
    // console.log("Previous button clicked!");
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    // console.log("Next button clicked!");
    this.page++;
    this.getOrders();
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getOrders();
  }

  // Initial dummy data
  // orders: Order[] = [
  //   {id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'}, total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 2)},
  //   {id: 2, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'}, total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 2)},
  //   {id: 3, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'}, total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 2)},
  //   {id: 4, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'}, total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 2)},
  //   {id: 5, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'mainst@example.com'}, total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 2)},
  // ];

}
