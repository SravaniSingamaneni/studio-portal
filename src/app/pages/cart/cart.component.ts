import { Component, inject, signal } from '@angular/core';
import { CartLine, CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart = inject(CartService);
  showCheckoutNote = signal(false);

  inc(line: CartLine) {
    this.cart.setQty(line.product.id, line.qty + 1);
  }

  dec(line: CartLine) {
    this.cart.setQty(line.product.id, line.qty - 1);
  }

  checkout() {
    // Real checkout and payments come with the backend
    this.showCheckoutNote.set(true);
  }
}
