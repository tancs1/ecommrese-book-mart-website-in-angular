import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/cart.service';

import { AuthServiceService } from 'src/app/core/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  
})
export class ProductComponent implements OnInit {
 @Input()book:any
  isProductInCart: boolean=false;
  isProductInWishlist: boolean=false;
  id:any;
  value!: number;
 constructor(private toster:ToastrService,
  private cartservice:CartService,
  public authService:AuthServiceService,
  private router:Router,
  ){}
 ngOnInit(): void {
  this.id = {'isbn': this.book.isbn};
  this.isProductInCart = this.cartservice.isProductInCart(this.book);
}


 addToCard(book:any){
  
  const storedLoginUser = localStorage.getItem('LoginUser');
  const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
if (loginUser && loginUser.length > 0) {
const userId = loginUser[0].id; 
  this.cartservice.addProductToCart(book)
  
this.toster.info('Item Add to Cart')
this.isProductInCart=true
}else{
  this.toster.error('Please Login First')
  this.isProductInCart=false
  this.authService.loginshow=true
  this.router.navigate(['/login'])
}
}
addWishList(book: any) {
  const storedLoginUser = localStorage.getItem('LoginUser');
  const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
if (loginUser && loginUser.length > 0) {
const userId = loginUser[0].id; 
  this.cartservice.addProductToWishlist(book);
  this.toster.info('Item Add to Your Wish List')

  this.isProductInWishlist = true;
}else{
  this.toster.error('Please Login First')
  this.authService.loginshow=true
  this.isProductInWishlist = false
  this.router.navigate(['/login'])
}
}}
