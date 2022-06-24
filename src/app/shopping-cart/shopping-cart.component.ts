import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
   cart !: any[]

  ngOnInit(): void {
   this.cart = this.getCartItems()

  }

  getCartItems(){
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  deleteProduct(product_id : number){

    let products = JSON.parse(localStorage.getItem('cart') as string);

    let productID = products.findIndex(
        (product: any) => product.id == product_id
    )

     products.splice(productID , 1);

     localStorage.setItem('cart' , JSON.stringify(products))

    console.log(products);
    this.cart = this.getCartItems()
}

}