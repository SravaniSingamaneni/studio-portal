import { Component, inject } from '@angular/core';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  cart = inject(CartService);
}
