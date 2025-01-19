import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, NgFor, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  cards: Array<Product> = [
    {
      _id: '1',
      name: 'Product 1',
      price: 10,
      desc: 'This is product 1',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      _id: '2',
      name: 'Product 1',
      price: 10,
      desc: 'This is product 1',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      _id: '3',
      name: 'Product 1',
      price: 10,
      desc: 'This is product 1',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      _id: '3',
      name: 'Product 1',
      price: 10,
      desc: 'This is product 1',
      imageUrl: 'https://picsum.photos/200/300',
    },
  ];
constructor(private productSer:ProductService){}
  ngOnInit(): void {
    this.productSer.getAllProducts().subscribe((res:any)=>{
      this.cards = res;
      console.log(res);
    });
  }
}
