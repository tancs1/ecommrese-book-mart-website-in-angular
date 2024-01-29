import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { AboutComponent } from './about/about.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ContactComponent } from './contact/contact.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoderComponent } from './loder/loder.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

import { RatingModule } from 'primeng/rating';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailsComponent,
    PriceDetailsComponent,
    CartItemComponent,
    CartComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
   
    SidePanelComponent,
        AboutComponent,
        WishListComponent,
        ContactComponent,
        CheckOutComponent,
        LoderComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
CoreModule,
ReactiveFormsModule,
ButtonModule,
ToastModule,
MessagesModule,
RatingModule
  ],
  exports:[
    HeaderComponent,
   
  ]

})
export class SharedModule { }
