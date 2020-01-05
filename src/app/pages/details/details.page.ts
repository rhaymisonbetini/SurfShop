import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { LoadingController, ToastController, IonInput } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePicker: ElementRef<HTMLInputElement>;
  productForm: FormGroup;
  private loading: any;
  public picker: string = null;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private loadingControler: LoadingController, private toaste: ToastController, private token: TokenService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      picture: [null, Validators.required],
      price: [null, Validators.required],
      user_id: [this.token.getUserIdToken(), Validators.required]
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


  onFileChosen(event: any) {
    const takedPhoto = (event.target as HTMLInputElement).files[0];
    if (!takedPhoto) {
      return;
    }
    const fileReader = new FileReader;
    fileReader.onload = () => {
      const dataUrl = fileReader.result.toString();
      this.picker = dataUrl
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

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }


}
