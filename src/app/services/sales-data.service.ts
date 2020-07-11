import { Injectable } from '@angular/core';
import { HttpClient as Http } from '@angular/common/http' ;
import 'rxjs/add/operator/map';

@Injectable()
export class SalesDataService {

  constructor(private _http: Http) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get('http://localhost:5000/api/order/' + pageIndex + '/' + pageSize)
      .map(res => res || []);
  }

  getOrdersByCustomer(n: number) {
    return this._http.get('http://localhost:5000/api/order/bycustomer/' + n)
      .map(res => res || []);
  }

  getOrdersByState() {
    return this._http.get('http://localhost:5000/api/order/bystate/')
      .map(res => res || []);
  }
}