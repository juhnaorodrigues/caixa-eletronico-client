import { Component, OnInit } from '@angular/core';
import {HttpClient} from "./../client/http-client";
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router) { }

  user: string;

  ngOnInit() {
    var userLogged = JSON.parse(localStorage.userLogged);
    this.user = userLogged.pessoa.nome;
  }

  logout(): void {
    localStorage.removeItem('userLogged');
    this.router.navigate(['/']);

  }

}
