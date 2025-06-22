import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/authentication/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { UsersComponent } from './components/users/users.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HeaderUserComponent,
    CategoryListComponent,
    CategoryAddComponent,
    ProductListComponent,
    ProductAddComponent,
    UsersComponent,
    DetailProductComponent,
    OrdersComponent,
    ProductDetailComponent,
    ProfileUpdateComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
