import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // auth component used in login/register pages to display
  // login/register form

  @Input() receiveName: string = '';
  isRegistering: boolean = false;

  constructor() {
    console.log(this.receiveName);
  }
  ngOnInit() {
    this.isRegistering = this.receiveName === 'Register';
  }
}
