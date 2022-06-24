import { Component, Input, OnInit } from '@angular/core';
import { product } from 'products';
import{ DataService } from '../data.service';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.css'],
    providers: [DataService]
})
export class AddToCartComponent implements OnInit {
    constructor(private api: DataService) {}

    @Input() product_id!: number;
    products : product[] = [];

    ngOnInit(): void {
      this.setCart();
    }

    setCart(){
      localStorage.setItem('cart', JSON.stringify([]));
    }

    addProduct(product_id: number) {
        this.api.sendGetRequest().subscribe({
          next: (resp: any[]) => {
            this.products = resp;

            let cart = Array.from(
                JSON.parse(localStorage.getItem('cart') as string)
            );

            let duplicateCartItem: any = cart.find(
                (cartItm: any) => product_id == cartItm.id
            );

            if (duplicateCartItem) {
                duplicateCartItem.amount++;
            } else {
                duplicateCartItem.amount = 1;
            }

            let product = this.products.find(
                (product: any) => product.id == product_id
            );

            let currentCart: any[] = [];

            if (!!localStorage.getItem('cart')) {
                currentCart = Array.from(
                    JSON.parse(localStorage.getItem('cart') as string)
                );
            }

            currentCart.push(product);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        },
        })
    }

    deleteProduct(product_id : number){

      let products = JSON.parse(localStorage.getItem('cart') as string);

      let productID = products.findIndex(
          (product: any) => product.id == product_id
      )

       products.splice(productID , 1);

       localStorage.setItem('cart' , JSON.stringify(products))

      console.log(products);
  }



}

