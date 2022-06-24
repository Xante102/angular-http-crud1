import { Component, Input, OnInit } from '@angular/core';
import { product } from 'products';
import {DataService} from '../data.service'

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent implements OnInit {
    constructor(private api: DataService) {}

    @Input() product_id!: number;
    products:product[] = [];

    ngOnInit(): void {}

    addProduct(id: number) {
        this.api.sendGetRequest().subscribe({
          next: (resp: product[]) => {
            this.products = resp;
            let currentCart: any[] = [];

            // If `cart` is found in localStorage we store it in `currentCart`
            if (!!localStorage.getItem('cart')) {
                currentCart = Array.from(
                    JSON.parse(localStorage.getItem('cart') as string)
                );
            }

            // Search for duplicate cart item
            let duplicateCartItem: any = currentCart.find(
                (cartItem: any) => cartItem.id == id
            );

            // If duplicate cart item is found we increment the amount instead of inserting a new product to the cart
            if (duplicateCartItem) {
                duplicateCartItem.amount += 1;
            } else {
                // Finding the product being added to the cart
                let product: any = this.products.find(
                    (product: any) => product.id == id
                );

                // Add the product found to the cart with `amount` set to `1`
                currentCart.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    amount: 1,
                });
            }

            // Updating the cart in localStorage with the new information
            localStorage.setItem('cart', JSON.stringify(currentCart));

            //* Cart Notification function goes here
            alert('Cart updated successfully');
        },
        })



    }
}
