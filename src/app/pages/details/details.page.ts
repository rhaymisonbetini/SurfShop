import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  productForm: FormGroup;
  private loading: any;
  private userId: string;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private loadingControler: LoadingController, private toaste: ToastController, private token: TokenService) { }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      picture: [null, Validators.required],
      price: [null, Validators.required],
      user_id: [ this.token.getUserIdToken(), Validators.required]
    })
  }

  saveProduct() {
    this.presentLoading();
    const product = this.productForm.getRawValue() as Product;
    console.log(product);
    this.productService.addProduct(product).subscribe(product => {
      this.loadingControler.dismiss();
      this.productForm.reset();
      this.presentToast('Novo produco adicionado com sucesso');
    }, error => {
      this.presentToast('Ocorreu um erro com sua solicitação...')
    });
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
