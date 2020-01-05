import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
   product = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.api).pipe(map((res: any) => {
      return res.json();
    })).subscribe(prod => {
      this.product.next(prod)
    })
  }

  addProduct(produto: Product) {

  }

  getProduct(id: String) {

  }

  update(id: string, product: Product) {

  }

  deleteProduct(id: string) {

  }
}
