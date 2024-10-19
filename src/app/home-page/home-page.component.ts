import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  features = [
    {
      title: 'Task management',
      description: 'Create multiple boards.',
    },
    {
      title: 'Prioritize',
      description: 'Prioritize tasks.',
    },
    {
      title: 'Grow',
      description: 'Helps with workflow efficiency.',
    },
  ];
  constructor(public auth: Auth) {}
}
