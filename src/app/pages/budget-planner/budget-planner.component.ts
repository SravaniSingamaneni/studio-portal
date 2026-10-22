import { Component, computed, signal } from '@angular/core';

interface PlanItem {
  id: string;
  label: string;
  price: number;
  unit: 'perGuest' | 'flat';
}

interface PlanCategory {
  name: string;
  icon: string;
  items: PlanItem[];
}

@Component({
  selector: 'app-budget-planner',
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.css',
})
export class BudgetPlannerComponent {
  guests = signal(50);
  budget = signal<number | null>(null);
  selected = signal<Set<string>>(new Set());

  guestPresets = [10, 25, 50, 75, 100, 150, 200, 300, 500, 1000];

  // Shows "Custom" in the dropdown when the typed number is not one of the presets
  presetValue = computed(() =>
    this.guestPresets.includes(this.guests()) ? String(this.guests()) : 'custom'
  );

  // PRICES: national averages and my estimates. Replace with your real rates.
  categories: PlanCategory[] = [
    {
      name: 'Decorations', icon: '🎀',
      items: [
        { id: 'arch', label: 'Balloon arch', price: 300, unit: 'flat' },
        { id: 'backdrop-std', label: 'Backdrop rental, standard (photo or stage)', price: 150, unit: 'flat' },
        { id: 'backdrop-premium', label: 'Backdrop rental, premium themed', price: 350, unit: 'flat' },
        { id: 'tables', label: 'Table styling', price: 150, unit: 'flat' },
        { id: 'lighting', label: 'Lighting and flowers', price: 250, unit: 'flat' },
        { id: 'garland', label: 'Flower garland decoration (festival)', price: 200, unit: 'flat' },
        { id: 'festival', label: 'Festival theme decoration (Diwali, Navratri, etc.)', price: 350, unit: 'flat' },
        { id: 'pooja', label: 'Pooja decoration (altar, flowers, rangoli)', price: 250, unit: 'flat' },
        { id: 'house', label: 'Full house decoration (house warming)', price: 450, unit: 'flat' },
      ],
    },
    {
      name: 'Food & Drinks', icon: '🍽️',
      items: [
        { id: 'snacks', label: 'Snacks and appetizers', price: 8, unit: 'perGuest' },
        { id: 'meal-casual', label: 'Main meal, casual drop-off style', price: 15, unit: 'perGuest' },
        { id: 'meal-buffet', label: 'Main meal, buffet with serving staff', price: 30, unit: 'perGuest' },
        { id: 'dessert', label: 'Dessert table', price: 6, unit: 'perGuest' },
        { id: 'drinks', label: 'Drinks', price: 4, unit: 'perGuest' },
      ],
    },
    {
      name: 'Music & Entertainment', icon: '🎤',
      items: [
        { id: 'dj', label: 'DJ and sound', price: 500, unit: 'flat' },
        { id: 'host', label: 'Host / emcee', price: 200, unit: 'flat' },
      ],
    },
    {
      name: 'Games & Activities', icon: '🎮',
      items: [
        { id: 'games', label: 'Party games', price: 120, unit: 'flat' },
        { id: 'photo', label: 'Photo booth', price: 300, unit: 'flat' },
        { id: 'kids', label: 'Kids activities', price: 5, unit: 'perGuest' },
      ],
    },
    {
      name: 'Gifts', icon: '🎁',
      items: [
        { id: 'favors', label: 'Return gifts', price: 5, unit: 'perGuest' },
        { id: 'wrap', label: 'Custom gift wrapping', price: 3, unit: 'perGuest' },
      ],
    },
  ];

  onPreset(value: string) {
    if (value !== 'custom') {
      this.guests.set(Number(value));
    }
  }

  setGuests(value: string) {
    if (value.trim() === '') { return; }   // lets the user clear the box and type a new number
    const n = Math.floor(Number(value)) || 1;
    this.guests.set(Math.max(1, Math.min(2000, n)));
  }

  setBudget(value: string) {
    const n = Number(value);
    this.budget.set(value === '' || n <= 0 ? null : n);
  }

  toggle(id: string) {
    this.selected.update((current) => {
      const next = new Set(current);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  isSelected(id: string) {
    return this.selected().has(id);
  }

  cost(item: PlanItem) {
    return item.unit === 'perGuest' ? item.price * this.guests() : item.price;
  }

  categoryTotals = computed(() =>
    this.categories.map((c) => ({
      name: c.name,
      icon: c.icon,
      total: c.items
        .filter((i) => this.selected().has(i.id))
        .reduce((sum, i) => sum + this.cost(i), 0),
    }))
  );

  total = computed(() => this.categoryTotals().reduce((sum, c) => sum + c.total, 0));
  perGuest = computed(() => this.total() / this.guests());

  difference = computed(() => {
    const b = this.budget();
    return b === null ? null : b - this.total();
  });
  over = computed(() => (this.difference() ?? 0) < 0);
  absDifference = computed(() => Math.abs(this.difference() ?? 0));
}
