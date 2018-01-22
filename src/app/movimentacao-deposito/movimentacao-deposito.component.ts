import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {MovimentacaoDepositoService} from "./movimentacao-deposito.service";
import {QuantidadeCedulas} from "../shared/quantidade-cedulas";
import Utils from "../utils";

@Component({
  moduleId: module.id,
  selector: 'app-movimentacao-deposito',
  templateUrl: './movimentacao-deposito.component.html',
  styleUrls: ['./movimentacao-deposito.component.css']
})
export class MovimentacaoDepositoComponent implements OnInit {

  quantidadeCedulas:QuantidadeCedulas;

  constructor(
    private movimentacaoDepositoService: MovimentacaoDepositoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.quantidadeCedulas = new QuantidadeCedulas('','','', '');
  }

  depositarCedulas():void {

    this.movimentacaoDepositoService.depositarCedulas(this.quantidadeCedulas).subscribe(
      data => {
        console.log(data);
        if ( data instanceof Array) {
          alert('Deposito efetuado com sucesso');
          this.quantidadeCedulas = new QuantidadeCedulas('','','', '');
        }
      }, (err) => {
        console.log(err);
        alert('Erro ao efetuar deposito.');
      });

  }

  eventHandler(event): boolean {
    return Utils.isNumber(event);
  }

  goBack(): void{
    this.location.back();
  }

}
