import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {HttpClient} from "../client/http-client";
import {QuantidadeCedulas} from "../shared/quantidade-cedulas";

@Injectable()
export class MovimentacaoSaqueService {

  constructor( private httpClient: HttpClient ) {
  }

  sacarCedulas(depositoModel: QuantidadeCedulas) {

    return this.httpClient.post('/rest/movimentacao/saque', depositoModel)
      .map((res: Response) => res.json()).do(() => {
        console.log('request finished');

      }).catch(this.handleError);
  }

  obtemCedulas() {
    return this.httpClient.get('/rest/cedula/findAll')
      .map((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error);
  }

}
