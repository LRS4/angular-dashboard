import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';
import 'rxjs/add/operator/catch';
import { RequestOptions } from 'http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _http: Http) { }

  httpOptions: HttpHeaders

  getServers(): Observable<Server[]> {
    return this._http.get<Server[]>('https://localhost:44364/api/server')
      .map(res => res || [])
      .catch(this.handleError)
  }

  handleError(error: any) {
    const message = (error.message)
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.log(message);
    return Observable.throw(message);
  }

  handleServerMessage(message: ServerMessage): Observable<Response[]> {
    const url = 'https://localhost:44364/api/server/' + message.id;
    return this._http.put<Response[]>(url, message, {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'q=0.8;application/json;q=0.9'
      })
    }).map(res => res || [])
  }
}
