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
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifference: number = 50;
  private loading: any;

  constructor(public keyboard: Keyboard, private loadingControler: LoadingController, private toaste: ToastController, private auth: AuthService) { }
  public userLogin: User = {};
  public userRegister: User = {};

  ngOnInit() {
  }

  login() {

  }

  async register() {
    await this.presentLoading();
    try {
      await this.auth.register()
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingControler.dismiss();
    }
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingControler.create({
      message: 'Aguarde...',
    });
    return this.loading.present();
  }

}
