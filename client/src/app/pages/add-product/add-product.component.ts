import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // Variable to store error messages
  successMessage: string = ''; // Variable to store success messages

  productForm!: FormGroup;
  constructor(
    private formBulder: FormBuilder,
    private productSer: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBulder.group({
      name: ['', [Validators.required]],
      desc: ['', []],
      price: ['', [Validators.required]],
      file: ['', []],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('desc', this.productForm.get('desc')?.value);
      // formData.append('owner', this.productForm.get('owner')?.value);

      if (this.file) {
        formData.append('image', this.file);
      }

      this.productSer.addProduct(formData).subscribe(
        (res: any) => {
          this.successMessage = 'Product added successfully!';
          this.errorMessage = '';
          this.productForm.reset();
          this.imageUrl = null;
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized. Please log in again.';
          } else {
            this.errorMessage =
              error.error?.message || 'An error occurred. Please try again.';
          }
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
