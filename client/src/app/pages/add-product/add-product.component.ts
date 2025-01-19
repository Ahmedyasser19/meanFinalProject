import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  profile: any;

  productForm!: FormGroup;
  constructor(
    private formBulder: FormBuilder,
    private productSer: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profile = localStorage.getItem('porofile');
    this.route.params.subscribe({
      next: (params: any) => {
        const id = params.id;
        this.productForm = this.formBulder.group({
          _id:[null,[]],
          name: [null, [Validators.required]],
          desc: [null, []],
          price: [null, [Validators.required]],
          imageUrl: [null, []],
          owner: [JSON.parse(this.profile)['id'], [Validators.required]],
        });
        if (id) {
          this.productSer.getProduct(id).subscribe((response)=>{
            this.productForm.patchValue(response);
          });
        }
      },
    });
  }

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

  onSubmit() {
    console.log(this.productForm.value);

    if (this.productForm.valid) {
      this.productSer
        .addProduct(this.productForm.value)
        .subscribe((res: any) => {
          console.log(res);
        });
    }
  }
}
