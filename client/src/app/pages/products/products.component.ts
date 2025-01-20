import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../service/product.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  cards: Array<Product> = []; // Ensure cards is initialized as an empty array
  productSer = inject(ProductService);
  isLoading = true;

  //   async ngOnInit(): Promise<void> {
  //     try {
  //       const res: any = await lastValueFrom(
  //         this.http.get(environment.apiURL + 'products')
  //       );
  //       this.cards = res || []; // Fallback to an empty array if res.data is undefined
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     } finally {
  //     }
  // }

  //constructor(private productSer: ProductService){ }
  ngOnInit(): void {
    this.productSer.getAllProducts().subscribe({
      next: (res: any) => {
        this.cards = res;
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
