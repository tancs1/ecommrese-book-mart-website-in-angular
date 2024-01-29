import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CartComponent } from './shared/cart/cart.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { LoginComponent } from './shared/login/login.component';
import { AboutComponent } from './shared/about/about.component';
import { WishListComponent } from './shared/wish-list/wish-list.component';
import { ContactComponent } from './shared/contact/contact.component';
import { CheckOutComponent } from './shared/check-out/check-out.component';
import { AuthGuard } from './shared/gard/auth.guard';
import { AuthServiceService } from './core/auth-service.service';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    // canActivate:[AuthGuard]
  },
  {
path:'home',
redirectTo:'',
pathMatch:'full'
  },
  {
    path:'cart',
    component:CartComponent,
    // canActivate:[AuthGuard]
  },
 {
  path:'product-details',
  component:ProductDetailsComponent,
  // canActivate:[AuthGuard]

 },{
  path:'login',
  component:LoginComponent
 },
 {
  path:'about',
  component:AboutComponent,
  // canActivate:[AuthGuard]
 },
 {
  path:'wish-list',
  component:WishListComponent,
  // canActivate:[AuthGuard]
 },{
  path:'contact',
  component:ContactComponent,
  // canActivate:[AuthGuard]
 },
 
  { path: 'checkout',
   component:CheckOutComponent,
   canActivate:[AuthGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthServiceService]
})
export class AppRoutingModule { }
