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
import { routes } from '../../app.routes';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // auth component used in login/register pages to display
  // login/register form
  authForm: FormGroup;
  @Input() receiveName: string = '';
  isRegistering: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.receiveName);

    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      pw: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.isRegistering = this.receiveName === 'Register';
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);

      this.http
        .post(environment.apiURL+'auth/login', this.authForm.value)
        .subscribe((res: any) => {
          console.log(res.user.token);
          localStorage.setItem('token', res.token);
          localStorage.setItem('porofile', JSON.stringify(res.user));
          this.router.navigate(['/products']);
        });
    }
  }
}
