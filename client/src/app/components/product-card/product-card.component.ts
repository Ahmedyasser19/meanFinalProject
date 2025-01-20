import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Product = {
    _id: '',
    createdAt: '',
    updatedAt: '',
    owner: '',
    name: '',
    desc: '',
    price: 0,
    description: '',
    imageUrl: '',
  };
  getOwner: string | null = localStorage.getItem('id');
  isOwner() {
    if (this.getOwner === this.product.owner) {
      return true;
    } else {
      return false;
    }
  }
}
