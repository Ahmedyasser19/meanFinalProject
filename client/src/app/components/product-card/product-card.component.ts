import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Product = {
    _id: '',
    name: '',
    price: 0,
    desc: '',
    imageUrl: '',
  };
}
