import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  inicioTurno: boolean;
  finalizadoTurno: boolean;
  ip: string = '';
  usuario: string = '';

  horario: Array<any> = [];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.horario = JSON.parse(localStorage.getItem('data'));
    this.usuario = localStorage.getItem('usuario');
    this.validacionLogueo();
    this.validacionDeslogueo();
  }

  startTurn() {
    this._loginService.getIp().subscribe((data) => {
      this.ip = data['ip'];
      this._loginService.startTurn(this.usuario, this.ip).subscribe((data) => {
        this.inicioTurno = true;
      });
    });
  }

  endTurn() {
    this._loginService.endTurn(this.usuario).subscribe((data) => {});
    this.finalizadoTurno = true;
  }

  salirApp() {
    this.inicioTurno = false;
    this.finalizadoTurno = false;
    this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  validacionLogueo() {
    if (this.cookieService.check('inicio')) {
      console.log('si hay turno logueado');
      this.inicioTurno = true;
    } else {
      this.inicioTurno = false;
    }
  }

  validacionDeslogueo() {
    if (this.cookieService.check('salida')) {
      this.finalizadoTurno = true;
    } else {
      this.finalizadoTurno = false;
    }
  }
}
