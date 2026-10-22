import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  services = [
    { icon: '🎉', title: 'Event Planning', blurb: 'We organize your celebration from start to finish.' },
    { icon: '🎀', title: 'Decorations', blurb: 'Themes, balloons and backdrops for any occasion.' },
    { icon: '🎤', title: 'Party Hosting', blurb: 'Friendly hosts, games and entertainment.' },
    { icon: '🎁', title: 'Gift Shop', blurb: 'Browse and order gifts online, delivered to you.' },
  ];
}
