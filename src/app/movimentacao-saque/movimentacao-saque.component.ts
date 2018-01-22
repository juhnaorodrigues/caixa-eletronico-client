import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import {MovimentacaoSaqueService} from "./movimentacao-saque.service";
import {OpcaoSaqueModel} from "./opcao-saque.model";
import {QuantidadeCedulas} from "../shared/quantidade-cedulas";
import Utils from "../utils";

@Component({
  moduleId: module.id,
  selector: 'app-movimentacao-saque',
  templateUrl: './movimentacao-saque.component.html',
  styleUrls: ['./movimentacao-saque.component.css']
})
export class MovimentacaoSaqueComponent implements OnInit {

  opcoesSaque: OpcaoSaqueModel[] = [];
  melhorOpcaoSaque: OpcaoSaqueModel;
  cedulasServidor: any[] = [];
  valorSaqueInput: string;

  constructor(
    private movimentacaoSaqueService: MovimentacaoSaqueService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.movimentacaoSaqueService.obtemCedulas().subscribe(
      data => {
        console.log(data);
        this.cedulasServidor = data;

      }, (err) => {
        console.log(err);
        alert('Erro:' + err.message);
      });
  }

  eventHandler(event): boolean {
    return Utils.isNumber(event);
  }

  mostrarOpcoesSaque(): void {
    let valorSaque = Number(this.valorSaqueInput);
    let valorDisponivelNoBanco = this.validaSaldoSaque(valorSaque);

    if ( isNaN(valorSaque) ) {
      alert('Preencha um valor válido');

    } else if ((valorSaque % 10) > 0) {
      alert('Não é possível sacar esse valor.');

    } else if ( !valorDisponivelNoBanco ) {
      alert('Quantidade solicitada excede a quantidade no banco.');
    } else {
      this.montaOpcoesSaque(valorSaque);
    }

  }


  validaSaldoSaque(valorSaque: number): boolean {

    let valorTotalBanco: number = 0;
    for (let i = 0; i < this.cedulasServidor.length; i++) {
      valorTotalBanco += (this.cedulasServidor[i].valor * this.cedulasServidor[i].quantidade);
    }

    if( valorTotalBanco >= valorSaque) {
      return true;
    }

  }

  montaOpcoesSaque(valorSaque: number): void {

    this.opcoesSaque = [];

    let listaCedulasBancoBackup = Object.assign([], this.cedulasServidor);

    this.ordenaListaDesc('valor', listaCedulasBancoBackup);

    let opcaoSaque:OpcaoSaqueModel;

    while ( listaCedulasBancoBackup.length > 0 ) {
      opcaoSaque = this.obtemOpcaoQuantidadeCedula(listaCedulasBancoBackup, valorSaque);

      if ( opcaoSaque.opcaoValida ) {
        this.opcoesSaque.push(opcaoSaque);
      }

      listaCedulasBancoBackup.shift();
    }

    listaCedulasBancoBackup = Object.assign([], this.cedulasServidor);
    this.ordenaListaDesc('quantidade', listaCedulasBancoBackup);
    this.melhorOpcaoSaque = this.obtemOpcaoQuantidadeCedula(listaCedulasBancoBackup, valorSaque);

  }

  ordenaListaDesc(propriedade: string, listaCedulasBancoBackup: any[]): void{
      listaCedulasBancoBackup.sort((n1,n2) => {
        if (n1[propriedade] < n2[propriedade]) {
          return 1;
        }

        if (n1[propriedade] > n2[propriedade]) {
          return -1;
        }

        return 0;
      });
  }


  obtemOpcaoQuantidadeCedula(listaCedulasBancoBackup: any[], valorSaque:number): OpcaoSaqueModel {

    let opcaoSaque:OpcaoSaqueModel = new OpcaoSaqueModel(0,0,0,0, true);
    let cedulaIteracao;
    let quantidadeInteira:number;
    let restoDivisao:number = valorSaque;
    let quantidadeNotasUtilizadas:number = 0;

    for (var i = 0; i < listaCedulasBancoBackup.length && (opcaoSaque.opcaoValida) && restoDivisao > 0; i++) {
      cedulaIteracao = listaCedulasBancoBackup[i];

      quantidadeInteira = Math.trunc(valorSaque/cedulaIteracao.valor);
      restoDivisao = valorSaque%cedulaIteracao.valor;

      if ( cedulaIteracao.valor == 100) {
        opcaoSaque.quantidade100 = quantidadeInteira;
      }

      if ( cedulaIteracao.valor == 50 ) {
        opcaoSaque.quantidade50 = quantidadeInteira;
      }

      if ( cedulaIteracao.valor == 20 ) {
        opcaoSaque.quantidade20 = quantidadeInteira;

      }

      if ( cedulaIteracao.valor == 10 ) {
        opcaoSaque.quantidade10 = quantidadeInteira;
      }

      quantidadeNotasUtilizadas++;
      opcaoSaque.opcaoValida = cedulaIteracao.quantidade >= quantidadeInteira;

      valorSaque = restoDivisao;

    }

    if ( quantidadeNotasUtilizadas > 3 ) {
      opcaoSaque.opcaoValida = false;
    }

    return opcaoSaque;

  }

  goBack(): void{
    this.location.back();
  }

  sacarCedulas ( opcaoSaque: OpcaoSaqueModel){

    let quantidadeCedulas: QuantidadeCedulas = new QuantidadeCedulas('','','','');
    quantidadeCedulas.quantidadeCedulas10 = String(opcaoSaque.quantidade10);
    quantidadeCedulas.quantidadeCedulas20 = String(opcaoSaque.quantidade20);
    quantidadeCedulas.quantidadeCedulas50 = String(opcaoSaque.quantidade50);
    quantidadeCedulas.quantidadeCedulas100 = String(opcaoSaque.quantidade100);

    this.movimentacaoSaqueService.sacarCedulas(quantidadeCedulas).subscribe(
      data => {
        console.log(data);
        if ( data instanceof Array) {
          alert('Saque efetuado com sucesso');
          this.melhorOpcaoSaque = null;
          this.opcoesSaque = [];
          this.valorSaqueInput = '';
          this.cedulasServidor = data;

        }
      }, (err) => {
        console.log(err);
        alert('Erro ao efetuar saque.');
      });
  }

  sacarMelhorOpcao(){
    this.sacarCedulas(this.melhorOpcaoSaque);
  }

}
