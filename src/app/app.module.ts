import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'

import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
   
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
