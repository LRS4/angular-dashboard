import { Injectable } from '@angular/core';
import { HttpClient as Http } from '@angular/common/http' ;
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class SalesDataService {

  constructor(private _http: Http) { }

  getOrders<T>(pageIndex: number, pageSize: number): Observable<T[]> {
    return this._http.get<T[]>('https://localhost:44364/api/order/' + pageIndex + '/' + pageSize)
      .map(res => res || []);
  }

  getOrdersByCustomer<T>(numberOfCustomers: number): Observable<T[]> {
    return this._http.get<T[]>('https://localhost:44364/api/order/bycustomer/' + numberOfCustomers)
      .map(res => res || []);
  }

  getOrdersByState<T>(): Observable<T[]> {
    return this._http.get<T[]>('https://localhost:44364/api/order/bystate/')
      .map(res => res || []);
  }
}