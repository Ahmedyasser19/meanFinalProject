import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interface/product';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  product: Product = {
    _id: '',
    name: '',
    price: 0,
    desc: '',
    imageUrl: '', // Initialize with null for the image
  };
  constructor() {
    this.product._id = String(this.route.snapshot.paramMap.get('id'));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.product.imageUrl = String(reader.result); // Set the imageUrl to the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }
}
