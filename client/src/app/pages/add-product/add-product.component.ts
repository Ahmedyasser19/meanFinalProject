import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  imageUrl: string | ArrayBuffer | null = null;
  username: string = '';
  price: string = '';
  description: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // Set the imageUrl to the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }
}
