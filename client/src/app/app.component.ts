import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    NgIf,
    ProductCardComponent,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}
  currentRoute: string = '';
  // remove navbar and footer from auth routes
  shouldShowLayout(): boolean {
    this.currentRoute = this.router.url;
    return !(
      this.currentRoute === '/login' || this.currentRoute === '/register'
    );
  }

  cards: Array<object> = [{}, {}, {}, {}, {}, {}];
}
