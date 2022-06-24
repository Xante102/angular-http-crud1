import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {
  constructor() {}
  cart!: any[];
  total: number = 0;

  ngOnInit(): void {
    this.cart = this.getCartItems();
  }

  ngAfterViewInit(): void {
    this.totalFunc();
  }

  amountChanged(event: any, cItemID: number): void {
    this.cart.find((item) => item.id == cItemID).amount = event.target.value;
    this.totalFunc();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  deleteProduct(product_id: number) {
    let products = JSON.parse(localStorage.getItem('cart') as string);

    let productID = products.findIndex(
      (product: any) => product.id == product_id
    );

    products.splice(productID, 1);
    localStorage.setItem('cart', JSON.stringify(products));
    this.cart = this.getCartItems();

    this.totalFunc();
  }

  totalFunc(newAmount?: number) {
    // Patch the NG0100 detection change error
    setTimeout(() => {
      let subtotals = 0;

      // Calculates subtotal for each item in cart
      this.cart.forEach((cartItem) => {
        subtotals += parseInt(cartItem.price) * parseInt(cartItem.amount);
      });

      // Sets the cart total to the calculated value
      this.total = subtotals;
    }, 0);
  }
}
