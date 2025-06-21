import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { authAdminGuard } from './guards/auth-admin.guard';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { authUserGuard } from './guards/auth-user.guard';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { UsersComponent } from './components/users/users.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  

  // Acceso para usuarios autenticados
  { path: 'product-list', component: ProductListComponent},
  { path: 'cart', component: DetailProductComponent, canActivate: [authUserGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authUserGuard] },
  { path: 'cart/detailproduct/:id', component: ProductDetailComponent },


   // Rutas exclusivas para administradores
   { path: 'product-add', component: ProductAddComponent, canActivate: [authAdminGuard] },
   { path: 'admin/products/edit/:id', component: ProductAddComponent, canActivate: [authAdminGuard]},
   { path: 'category-list', component: CategoryListComponent, canActivate: [authAdminGuard] },
   { path: 'category-add', component: CategoryAddComponent, canActivate: [authAdminGuard] },
   { path: 'users', component: UsersComponent, canActivate: [authAdminGuard] },



  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
