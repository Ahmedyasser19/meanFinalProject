import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../svg/profile/profile.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ProfileComponent,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() receivePath: string = '';
  user: any;
  constructor() {
    this.user = localStorage.getItem('email');
  }
}
