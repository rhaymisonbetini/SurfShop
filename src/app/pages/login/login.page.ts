import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController, IonSegment } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonSegment, { static: false }) segment: IonSegment;
  public wavesPosition: number = 0;
  public wavesDifference: number = 50;
  private loading: any;
  public keyBoardOnScreen = false;
  public userLogin: User = {};
  public userRegister: User = {};

  constructor(private loadingControler: LoadingController,
    private toaste: ToastController, private auth: AuthService, private tokeService: TokenService,
    private router: Router) { }


  ngOnInit() {
  }

  login() {
    this.presentLoading();
    this.auth.login(this.userLogin).subscribe(userLogin => {
      this.loadingControler.dismiss();
      if (userLogin.access_token) {
        console.log(userLogin);
        this.tokeService.setToken(userLogin.access_token);
        this.tokeService.setUserId(userLogin.user_id);
        this.router.navigate(['home']);
      } else {
        this.presentToast('Ocorreu um erro com sua solicitação, tente novamente');
      }
    }, error => {
      this.presentToast(error.message);
      this.loadingControler.dismiss();
    })
  }

  register() {
    this.presentLoading();
    this.auth.register(this.userRegister).subscribe(userData => {
      this.loadingControler.dismiss();
      this.presentToast('Usuário cadastrado com sucesso!');
      this.slides.slidePrev();
      this.segment.value = 'login';
      this.userRegister.email = '';
      this.userRegister.name = '';
      this.userRegister.password = '';
    }, error => {
      this.presentToast(error.message)
      this.loadingControler.dismiss();
    });
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

  async presentToast(message: string) {
    const toast = await this.toaste.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}
