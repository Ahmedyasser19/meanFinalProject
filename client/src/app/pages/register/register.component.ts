import { Component } from '@angular/core';
import { AuthComponent } from '../../components/auth/auth.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = 'Register';
}
