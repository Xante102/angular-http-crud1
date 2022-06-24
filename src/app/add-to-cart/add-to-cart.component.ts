import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
})
export class AddToCartComponent implements OnInit {
    constructor(private api: ApiService) {}

    @Input() product_id!: number;
    products = [];

    ngOnInit(): void {}

    addProduct(product_id: number) {
        this.api.getProducts().subscribe({
            next: (resp: []) => {
                this.products = resp;
                let currentCart: any[] = [];

                if (!!localStorage.getItem('cart')) {
                    currentCart = Array.from(
                        JSON.parse(localStorage.getItem('cart') as string)
                    );
                }

                currentCart.forEach((product) => {
                    if (!product.amount) product.amount = 1;
                });

                let duplicateCartItem: any = currentCart.find(
                    (cartItm: any) => product_id == cartItm.id
                );

                if (duplicateCartItem) {
                    duplicateCartItem.amount += 1;
                } else {
                    let product: any = this.products.find(
                        (product: any) => product.id == product_id
                    );

                    currentCart.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        amount: 1,
                    });
                }

                localStorage.setItem('cart', JSON.stringify(currentCart));
            },
        });
    }
}
