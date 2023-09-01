import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { BookPageComponent } from './components/pages/book-page/book-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AddNewBookPageComponent } from './components/pages/admin-pages/add-new-book-page/add-new-book-page.component';
import { OrdersComponent } from './components/pages/orders-page/orders.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardPageComponent } from './components/pages/admin-pages/admin-dashboard-page/admin-dashboard-page.component';

const routes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'book/:id', component: BookPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  //{ path: 'addNewBook', component: AddNewBookPageComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: AdminDashboardPageComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
