import { HttpParams } from '@angular/common/http';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class RequestService {

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/';

  readonly END_POINTS = {
    USERS : 'users'
  };

  constructor(
    private http: HttpService
  ) { }

  public getClients(): Observable<any> {
    return this.http.get(`${this.ROOT_URL}${this.END_POINTS.USERS}`)
      .map((response: any) => response)
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  public getClientsById(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.ROOT_URL}${this.END_POINTS.USERS}`, params)
      .map((response: any) => response)
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  public createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.ROOT_URL}${this.END_POINTS.USERS}`, clientData)
      .map((response: any) => response)
      .catch((error) => {
        return Observable.throw(error);
      });
  }

}
