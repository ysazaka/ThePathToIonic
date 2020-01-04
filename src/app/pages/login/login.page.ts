import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {}

  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;
      message = error.message;
      switch(error.code) {
        case 'auth/user-not-found':
          message = 'E-mail e/ou senha inválida';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido';
          break;
        case 'auth/invalid-password':
          message = 'Senha inválida';
          break;
        case 'auth/weak-password':
          message = 'A senha deve conter no mínimo 6 caracteres';
          break;
        case 'auth/wrong-password':
          message = 'Senha inválida';
          break;
        case 'auth/internal-error':
          message = 'Erro no processamento, tente novamente';
          break;
      }

      console.error(error);
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch(error) {
      let message: string;
      message = error.message;
      switch(error.code) {
        case 'auth/email-already-in-use':
          message = 'Este e-mail já foi cadastrado';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido';
          break;
        case 'auth/invalid-password':
          message = 'Senha inválida';
          break;
        case 'auth/weak-password':
          message = 'A senha deve conter no mínimo 6 caracteres';
          break;
        case 'auth/internal-error':
          message = 'Erro no processamento, tente novamente';
          break;
      }

      console.error(error);
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 4000 });
    toast.present();
  }

}
