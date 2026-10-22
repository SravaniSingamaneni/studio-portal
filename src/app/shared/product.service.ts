import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // SAMPLE products and prices: I will replace in future requirements 
  private readonly products: Product[] = [
    { id: 'birthday-box', name: 'Birthday Surprise Box', description: 'Treats, a card and little surprises in a gift box.', price: 34.99, category: 'Birthday', icon: '🎂' },
    { id: 'photo-frame', name: 'Personalized Photo Frame', description: 'Wooden frame with a custom name or message.', price: 24.99, category: 'Personalized', icon: '🖼️' },
    { id: 'name-mug', name: 'Custom Name Mug', description: 'Ceramic mug printed with any name.', price: 14.99, category: 'Personalized', icon: '☕' },
    { id: 'candle-trio', name: 'Scented Candle Trio', description: 'Three hand-poured candles in a gift pack.', price: 29.0, category: 'Housewarming', icon: '🕯️' },
    { id: 'houseplant', name: 'Houseplant in Planter', description: 'Easy-care plant in a decorative planter.', price: 22.0, category: 'Housewarming', icon: '🪴' },
    { id: 'diya-set', name: 'Festival Diya Gift Set', description: 'Decorated diyas with a festive box.', price: 27.5, category: 'Festival', icon: '🪔' },
    { id: 'pooja-thali', name: 'Pooja Thali Set', description: 'Thali with kumkum holder, bowls and a diya.', price: 36.0, category: 'Festival', icon: '🌺' },
    { id: 'sweets-hamper', name: 'Sweets and Dry Fruit Hamper', description: 'Assorted sweets and dry fruits for celebrations.', price: 44.99, category: 'Festival', icon: '🍬' },
    { id: 'bouquet', name: 'Fresh Flower Bouquet', description: 'Seasonal flowers, hand-wrapped.', price: 39.99, category: 'Occasions', icon: '💐' },
    { id: 'chocolate-box', name: 'Chocolate Gift Box', description: 'Assorted chocolates in a keepsake box.', price: 26.0, category: 'Occasions', icon: '🍫' },
    { id: 'baby-basket', name: 'Baby Shower Basket', description: 'Soft toy, blanket and keepsakes for the new arrival.', price: 49.99, category: 'Baby', icon: '🧸' },
    { id: 'return-pack', name: 'Return Gift Pack (10 pieces)', description: 'Ten small gifts, ready to hand out to guests.', price: 32.0, category: 'Return gifts', icon: '🎁' },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
