import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interface/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  file: File | null = null;
  product: Product = {
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

  errorMessage: string = ''; // Variable to store error messages
  successMessage: string = ''; // Variable to store success messages

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve data from query parameters
    const queryParams = this.route.snapshot.queryParamMap;
    this.product = {
      _id: String(this.route.snapshot.paramMap.get('id')) || '',
      imageUrl: queryParams.get('imageUrl') || '',
      name: queryParams.get('name') || '',
      price: parseFloat(queryParams.get('price') || '0'),
      desc: queryParams.get('desc') || '',
      owner: queryParams.get('owner') || '',
      createdAt: '',
      updatedAt: '',
      description: '',
    };

    // Initialize the form with existing values
    this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      desc: [this.product.desc, Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.product.imageUrl = String(reader.result); // Update preview image
      };
      reader.readAsDataURL(this.file); // Read the file as a Data URL
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();

      // Compare the form values with the original product values
      const name = this.productForm.get('name')?.value;
      const price = this.productForm.get('price')?.value;
      const desc = this.productForm.get('desc')?.value;

      if (name && name !== this.product.name) {
        formData.append('name', name);
        console.log(name);
      }
      if (price && price !== this.product.price) {
        formData.append('price', price);
      }
      if (desc && desc !== this.product.desc) {
        formData.append('desc', desc);
      }

      // Handle the image
      if (this.file) {
        formData.append('image', this.file); // Add new file if selected
      }

      this.productService.updateProduct(this.product._id, formData).subscribe(
        (res) => {
          this.successMessage = 'Product updated successfully!';
          this.errorMessage = '';
          this.productForm.reset();
          this.file = null;
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        (error) => {
          this.errorMessage =
            error.error?.message ||
            'An error occurred. Please try again. ' + JSON.stringify(error);
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
