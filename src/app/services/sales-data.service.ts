import { Injectable } from '@angular/core';
import { HttpClient as Http } from '@angular/common/http' ;
import 'rxjs/add/operator/map';

@Injectable()
export class SalesDataService {

  constructor(private _http: Http) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get('https://localhost:44364/api/order/' + pageIndex + '/' + pageSize)
      .map(res => res || []);
  }

  getOrdersByCustomer(numberOfCustomers: number) {
    return this._http.get('https://localhost:44364/api/order/bycustomer/' + numberOfCustomers)
      .map(res => res || []);
  }

  getOrdersByState() {
    return this._http.get('https://localhost:44364/api/order/bystate/')
      .map(res => res || []);
  }
}