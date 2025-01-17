import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, NgFor, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  cards: Array<Product> = [
    {
      id: '1',
      name: 'Product 1',
      price: 10,
      description: 'This is product 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: '2',
      name: 'Product 1',
      price: 10,
      description: 'This is product 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: '3',
      name: 'Product 1',
      price: 10,
      description: 'This is product 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: '3',
      name: 'Product 1',
      price: 10,
      description: 'This is product 1',
      image: 'https://picsum.photos/200/300',
    },
  ];
}
