import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../svg/profile/profile.component';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() receivePath: string = '';
  user: any;
  constructor() {
    this.user = localStorage.getItem('porofile');
    this.user = JSON.parse(this.user);
  }
}
