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

  // SAMPLE PRICES: replace with your real rates
  categories: PlanCategory[] = [
    {
      name: 'Decorations', icon: '🎀',
      items: [
        { id: 'arch', label: 'Balloon arch', price: 150, unit: 'flat' },
        { id: 'backdrop', label: 'Themed backdrop', price: 220, unit: 'flat' },
        { id: 'tables', label: 'Table styling', price: 120, unit: 'flat' },
        { id: 'lighting', label: 'Lighting and flowers', price: 180, unit: 'flat' },
      ],
    },
    {
      name: 'Food & Drinks', icon: '🍽️',
      items: [
        { id: 'snacks', label: 'Snacks and appetizers', price: 8, unit: 'perGuest' },
        { id: 'meal', label: 'Main meal', price: 22, unit: 'perGuest' },
        { id: 'dessert', label: 'Dessert table', price: 6, unit: 'perGuest' },
        { id: 'drinks', label: 'Drinks', price: 4, unit: 'perGuest' },
      ],
    },
    {
      name: 'Music & Entertainment', icon: '🎤',
      items: [
        { id: 'dj', label: 'DJ and sound', price: 350, unit: 'flat' },
        { id: 'host', label: 'Host / emcee', price: 200, unit: 'flat' },
        { id: 'live', label: 'Live performer', price: 500, unit: 'flat' },
      ],
    },
    {
      name: 'Games & Activities', icon: '🎮',
      items: [
        { id: 'games', label: 'Party games', price: 120, unit: 'flat' },
        { id: 'photo', label: 'Photo booth', price: 250, unit: 'flat' },
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

  setGuests(value: string) {
    const n = Math.floor(Number(value)) || 1;
    this.guests.set(Math.max(1, Math.min(500, n)));
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
