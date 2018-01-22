import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClient} from "./client/http-client";
import {HttpModule} from '@angular/http';
import {LoginFormService} from "./login-form/login-form.service";
import { MovimentacaoSaqueComponent } from './movimentacao-saque/movimentacao-saque.component';
import { MovimentacaoDepositoComponent } from './movimentacao-deposito/movimentacao-deposito.component';
import {MovimentacaoDepositoService} from "./movimentacao-deposito/movimentacao-deposito.service";
import {MovimentacaoSaqueService} from "./movimentacao-saque/movimentacao-saque.service";

const appRoutes: Routes =[
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginFormComponent
  },
  {
    path:'welcome',
    component: WelcomeComponent
  },
  {
    path:'Movimentacao/Saque',
    component: MovimentacaoSaqueComponent
  },
  {
    path:'Movimentacao/Deposito',
    component: MovimentacaoDepositoComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    WelcomeComponent,
    MovimentacaoSaqueComponent,
    MovimentacaoDepositoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [
    HttpClient,
    LoginFormService,
    MovimentacaoDepositoService,
    MovimentacaoSaqueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
