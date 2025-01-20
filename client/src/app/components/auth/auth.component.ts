import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  authForm: FormGroup;
  @Input() receiveName: string = '';
  isRegistering: boolean = false;
  errorMessage: string = ''; // Variable to store the error message

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize form group with pw2 field only for registration
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required]],
        pw: ['', [Validators.required, Validators.minLength(6)]], // Added minLength validator
        pw2: ['', [Validators.required]], // Only relevant for registration
      },
      { validators: this.isRegistering ? this.passwordsMatchValidator : null }
    );
  }

  ngOnInit() {
    this.isRegistering = this.receiveName === 'Register';

    // If it's the login page, remove the pw2 field from the form
    if (!this.isRegistering) {
      this.authForm.removeControl('pw2');
    }
  }

  // Custom validator to check if the password and confirm password match
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('pw')?.value;
    const confirmPassword = group.get('pw2')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.authForm.valid) {
      const authEndpoint = this.isRegistering ? 'auth/register' : 'auth/login';
      const { pw2, ...formData } = this.authForm.value; // Remove pw2 for backend
      this.http.post(environment.apiURL + authEndpoint, formData).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.user.token);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('id', res.user.id);
          // if auth endpoint is register redirect to login
          if (authEndpoint === 'auth/register') {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/products']);
          }
        },
        (error) => {
          // Capture and display the error message from the backend
          this.errorMessage =
            error.error?.error || 'An error occurred. Please try again.';
        }
      );
    }
  }

  get passwordMismatch() {
    return (
      this.authForm.hasError('mismatch') && this.authForm.get('pw2')?.touched
    );
  }
}
