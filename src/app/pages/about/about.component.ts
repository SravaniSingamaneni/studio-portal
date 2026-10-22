import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  values = [
    { icon: '💛', title: 'Personal touch', text: 'Every celebration is different, so every plan is built around you.' },
    { icon: '🎨', title: 'Creative details', text: 'Thoughtful décor and little surprises that guests remember.' },
    { icon: '🤝', title: 'Stress-free', text: 'We handle the planning, so you can enjoy the moment.' },
  ];

  steps = [
    { n: 1, title: 'Tell us your idea', text: 'Share the occasion, date and budget.' },
    { n: 2, title: 'We plan it with you', text: 'Pick services, themes and gifts.' },
    { n: 3, title: 'Order and pay online', text: 'Secure checkout, with status updates all the way.' },
    { n: 4, title: 'Celebrate', text: 'We set up, host and take care of returns if needed.' },
  ];
}
