import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HttpClient} from "../client/http-client";

@Injectable()
export class LoginFormService {

  constructor(private httpClient: HttpClient) {
  }

  login(login: string, senha: string) {

    let loginForm:any = {"login": login, "senha": senha};

    return this.httpClient.post('/login', JSON.stringify(loginForm))
      .map((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error);
  }

}
