import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {QuantidadeCedulas} from "./../shared/quantidade-cedulas";
import {HttpClient} from "../client/http-client";

@Injectable()
export class MovimentacaoDepositoService {

  private headers: Headers = new Headers({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient ) {
    this.headers.append('token','MyCustomHeaderValue');
  }

  depositarCedulas(quantidadeCedulas: QuantidadeCedulas) {
    console.log('teste');
    return this.httpClient.post('/rest/movimentacao/deposito', JSON.stringify(quantidadeCedulas))
      .map((res: Response) => res.json()).do(() => {
        console.log('requisição deposito finalizada');
      }).catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

}
