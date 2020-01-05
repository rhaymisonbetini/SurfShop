import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  protected products = new Array<Product>();
  private productsSubscripiton: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productsSubscripiton = this.productService.product.subscribe((prods: Product[]) => {
      this.products = prods
    })
    this.productService.getProducts();
  }

  ngOnDestroy() {
    this.productsSubscripiton.unsubscribe();
  }


  deleteProduct(id: number): void {

  }

  logout(){
    
  }

}
