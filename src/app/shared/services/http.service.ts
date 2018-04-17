import { BaseRequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class HttpService {


  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: any) {
    const headers = new HttpHeaders().set('Authorization', 'auth-token');
    return this.http.get(url, { params, headers })
      .map((res: any) => res.text() ? res.json() : [])
      .catch(error => Observable.throw(error));
  }

  public post(url: string, data?: any) {
    return this.http.post(url, data)
      .map((res: any) => res.text() ? res.json() : [])
      .catch(error => Observable.throw(error));
  }

}
