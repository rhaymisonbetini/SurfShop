import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productudos = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  get products() {
    return this.productudos.asObservable();
  }

  getProducts() {
    return this.http.get(environment.api + 'auth/products').pipe(map((res: any) => {
      return res;
    })).subscribe(prod => {
      this.productudos.next(prod)
    })
  }

  addProduct(produto: Product) {
    let generatedId: number;
    const newProduct = produto;
    return this.http.post<Product>(environment.api+'auth/product/create', produto).pipe(switchMap((res: Product) => {
      generatedId = res.id;
      return this.products
    }), take(1), tap(product => {
      newProduct.id = generatedId;
      console.log(newProduct);
      this.productudos.next(product.concat(newProduct))
    }))
  }

  getProduct(id: String) {

  }

  update(id: string, product: Product) {

  }

  deleteProduct(id: string) {

  }

}
