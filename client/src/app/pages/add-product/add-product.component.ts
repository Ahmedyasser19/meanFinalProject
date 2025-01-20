import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // Variable to store error messages
  successMessage: string = ''; // Variable to store success messages
  id!: string;
  productForm!: FormGroup;
  constructor(
    private formBulder: FormBuilder,
    private productSer: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => {
        this.id = params.id;
        this.productForm = this.formBulder.group({
          name: ['', [Validators.required]],
          desc: ['', []],
          price: ['', [Validators.required]],
          file: ['', []],
        });
        if (this.id) {
          const queryParams = this.route.snapshot.queryParamMap;
          this.productSer.getProduct(this.id).subscribe((response) => {
            this.productForm.patchValue(response);
            this.imageUrl = queryParams.get('imageUrl') || '';
          });
        }
      },
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

      this.productSer.addProduct(formData, this.id).subscribe({
        next: (res: any) => {
          this.successMessage = 'Product added successfully!';
          this.errorMessage = '';
          this.productForm.reset();
          this.imageUrl = null;
          setTimeout(() => {
            this.router.navigateByUrl('/products');
          }, 1000);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized. Please log in again.';
          } else {
            this.errorMessage =
              error.error?.message || 'An error occurred. Please try again.';
          }
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  removeProduct() {
    const conf = confirm('are You Shore od Delete Product');
    if (conf) {
      this.productSer.removeProduct(this.id).subscribe({
        next: () => {
          this.errorMessage = 'the Product are Deleted';
          setTimeout(() => {
            this.router.navigateByUrl('/products');
          }, 1000);
        },
        error: () => {},
      });
    }
  }
}
