import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  features = [
    {
      title: 'Collaborative Tasks',
      description: 'Work together with your team in real-time.',
    },
    {
      title: 'Time Tracking',
      description: 'Keep track of time spent on tasks and projects.',
    },
    {
      title: 'Analytics',
      description: 'Get insights into your workflow efficiency.',
    },
  ];
}
