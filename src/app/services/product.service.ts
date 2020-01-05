import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';


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
    let newProduct: Product;
    return this.http.post<Product>(environment.api + 'auth/product/create', produto).pipe(switchMap((res: Product) => {
      newProduct = res;
      return this.products
    }), take(1), tap(product => {
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
