import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { MessageService } from 'primeng/api';
import {  Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/auth-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService],
})
export class CartComponent implements OnInit {
cartItems:any[]=[]

  constructor(private cartService:CartService,private authservice:AuthServiceService, private router:Router ,private messageService: MessageService){

  }
  ngOnInit(): void {
    this.cartItems=this.cartService.getAllCartItem()
  }
  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'First Login and  Than Conitinue!' });
}
checkout(){
  console.log(this.authservice.islogin);
  
if(this.authservice.islogin==true){
  this.router.navigate(['checkout'])
}else{

  this.showWarn()

  const delayedPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Delayed action!');
    }, 1000);
  });

  // Handle the Promise
  delayedPromise.then((result) => {
    this.authservice.loginshow=true
  this.router.navigate(['login'])
  });


}
}
}
