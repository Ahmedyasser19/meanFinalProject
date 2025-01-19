import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'operation', component: AddProductComponent },
      { path: 'operation/:id', component: AddProductComponent },
      { path: '**', component: NotFoundComponent },
    ],
    // canActivate:[]
  },
  { path: '**', component: NotFoundComponent },
];
