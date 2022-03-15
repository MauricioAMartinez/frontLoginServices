import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = false;

  usuario = {
    user: '',
    pass: '',
  };

  prueba = {
    user: 'mauricio',
    pass: '12345',
  };

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private alertController: AlertController,
    private _loginService: LoginService
  ) {}
  ngOnInit() {}

  ingresar() {
    this._loginService
      .postLogin(this.usuario.user, this.usuario.pass)
      .subscribe(
        (data) => {
          let alerta = '';
          if (data['message'] == 'Ok') {
            if (data['hour_startCIU']) {
              this.cookieService.set('inicio', 'inicio', 1, '/');
            }
            if (data['hour_endCIU']) {
              this.cookieService.set('salida', 'salida', 1, '/');
            }
            let usuario = data['name'];
            this.cookieService.set('token_access', usuario, 1, '/');
            localStorage.setItem('data', JSON.stringify(data));
            localStorage.setItem('usuario', this.usuario.user);
            this.fakeLoading();
            this.usuario = {
              user: '',
              pass: '',
            };
          } else {
            alerta = data['message'];
            this.presentAlert(alerta);
          }
        },
        (error) => {}
      );
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  fakeLoading() {
    this.login = true;
    setTimeout(() => {
      this.router.navigate(['home']);
      this.login = false;
    }, 3000);
  }
}
