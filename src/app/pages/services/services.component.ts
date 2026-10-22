import { Component } from '@angular/core';

interface StudioService {
  icon: string;
  title: string;
  tagline: string;
  includes: string[];
  color: 'blue' | 'green' | 'gold' | 'teal';
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services: StudioService[] = [
    {
      icon: '🎉',
      title: 'Event Planning',
      tagline: 'From the first idea to the last guest leaving happy.',
      includes: ['Theme and budget planning', 'Venue and vendor coordination', 'Guest list and schedule', 'Day-of event management'],
      color: 'blue',
    },
    {
      icon: '🎀',
      title: 'Decorations',
      tagline: 'Beautiful setups that match your theme.',
      includes: ['Balloon arches and backdrops', 'Table and stage styling', 'Flowers and lighting', 'Setup and cleanup'],
      color: 'green',
    },
    {
      icon: '🎤',
      title: 'Party Hosting',
      tagline: 'Friendly hosts who keep the energy up.',
      includes: ['Emcee and games', 'Music and entertainment', 'Kids and family activities', 'Birthdays, baby showers, anniversaries'],
      color: 'gold',
    },
    {
      icon: '🎁',
      title: 'Gift Shop',
      tagline: 'Browse, order and have gifts delivered.',
      includes: ['Curated gift collections', 'Custom gift wrapping', 'Online ordering and payment', 'Order tracking and easy returns'],
      color: 'teal',
    },
  ];
}
