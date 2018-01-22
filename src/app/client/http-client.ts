import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {
  }

  get(url) {
    let headers = new Headers();
    let token:string = this.getTokenUserLogged();
    this.createAuthorizationHeader(headers, token);

    return this.http.get(url, {headers: headers});
  }

  post(url, data) {
    let headers = new Headers();
    let token:string = this.getTokenUserLogged();
    this.createAuthorizationHeader(headers, token);
    return this.http.post(url, data, {headers: headers});
  }

  getTokenUserLogged(): string {

    if( localStorage.userLogged ) {
      var userLogged = JSON.parse(localStorage.userLogged);
      return userLogged.token;
    } else {
      return '';
    }
  }

  createAuthorizationHeader(headers: Headers, token: string) {
    headers.append('Content-Type', 'application/json');

    if( token ) {
      headers.append('TOKEN', token);
    }
  }

}
