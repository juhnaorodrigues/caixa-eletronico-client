import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import {LoginFormService} from "./login-form.service";
import {LoginForm} from "./login-form.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {

  userLogged: any;
  loginForm: LoginForm;

  constructor(private router:Router, private loginFormService: LoginFormService) { }

  ngOnInit() {
    this.loginForm = new LoginForm('', '');
  }

  authenticateUser() {

    // this.router.navigate(['welcome']);

    this.loginFormService.login(this.loginForm.login, this.loginForm.senha).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('userLogged', JSON.stringify(data));
        this.router.navigate(['welcome']);
      }, (err) => {
        console.log(err);
        alert('Erro ao efetuar deposito.');
      });

  }

}
