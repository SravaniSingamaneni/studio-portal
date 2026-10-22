import { Component, computed, inject, signal } from '@angular/core';
import { Product, ProductService } from '../../shared/product.service';
import { CartService } from '../../shared/cart.service';

type SortMode = 'featured' | 'low' | 'high';

@Component({
  selector: 'app-gift-shop',
  templateUrl: './gift-shop.component.html',
  styleUrl: './gift-shop.component.css',
})
export class GiftShopComponent {
  private productService = inject(ProductService);
  cart = inject(CartService);

  categories = ['All', ...this.productService.getCategories()];
  selectedCategory = signal('All');
  search = signal('');
  sort = signal<SortMode>('featured');
  added = signal<string | null>(null);   // id of the product just added, for button feedback

  visible = computed(() => {
    const term = this.search().trim().toLowerCase();
    const category = this.selectedCategory();

    const list = this.productService.getAll().filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (term === '' ||
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term))
    );

    if (this.sort() === 'low') { list.sort((a, b) => a.price - b.price); }
    if (this.sort() === 'high') { list.sort((a, b) => b.price - a.price); }
    return list;
  });

  setSort(value: string) {
    this.sort.set(value as SortMode);
  }

  addToCart(product: Product) {
    this.cart.add(product);
    this.added.set(product.id);
    setTimeout(() => {
      if (this.added() === product.id) { this.added.set(null); }
    }, 1200);
  }
}
