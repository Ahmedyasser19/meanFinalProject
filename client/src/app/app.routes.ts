import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { activateGuard } from './gards/activate.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'operation', component: AddProductComponent ,canActivate:[activateGuard]},
      { path: 'operation/:id', component: AddProductComponent ,canActivate:[activateGuard]},
    ],
  },
  { path: '**', component: NotFoundComponent },
];
