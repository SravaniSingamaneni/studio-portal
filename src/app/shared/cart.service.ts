import { Injectable, computed, inject, signal } from '@angular/core';
import { Product, ProductService } from './product.service';

export interface CartLine {
  product: Product;
  qty: number;
}

interface StoredLine {
  id: string;
  qty: number;
}

const STORAGE_KEY = 'aadvi-cart';
const MAX_QTY = 99;

@Injectable({ providedIn: 'root' })
export class CartService {
  private products = inject(ProductService);
  private items = signal<StoredLine[]>(this.load());

  lines = computed<CartLine[]>(() =>
    this.items().flatMap((item) => {
      const product = this.products.getById(item.id);
      return product ? [{ product, qty: item.qty }] : [];
    })
  );

  count = computed(() => this.lines().reduce((n, l) => n + l.qty, 0));
  subtotal = computed(() => this.lines().reduce((sum, l) => sum + l.product.price * l.qty, 0));

  add(product: Product) {
    this.update((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i
        );
      }
      return [...items, { id: product.id, qty: 1 }];
    });
  }

  setQty(id: string, qty: number) {
    this.update((items) =>
      qty <= 0
        ? items.filter((i) => i.id !== id)
        : items.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, MAX_QTY) } : i))
    );
  }

  remove(id: string) {
    this.update((items) => items.filter((i) => i.id !== id));
  }

  clear() {
    this.update(() => []);
  }

  private update(change: (items: StoredLine[]) => StoredLine[]) {
    this.items.update(change);
    this.save();
  }

  private load(): StoredLine[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.filter(
          (i: any) => typeof i?.id === 'string' && Number.isInteger(i?.qty) && i.qty > 0
        )
        : [];
    } catch {
      return [];
    }
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    } catch {
      // storage unavailable (private mode, etc.): the cart still works, it just won't persist
    }
  }
}
