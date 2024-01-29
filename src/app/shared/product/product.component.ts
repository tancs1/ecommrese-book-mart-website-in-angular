import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/cart.service';

import { AuthServiceService } from 'src/app/core/auth-service.service';
import { ToastrService } from 'ngx-toastr';

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
  ){}
 ngOnInit(): void {
  this.id = {'isbn': this.book.isbn};
  this.isProductInCart = this.cartservice.isProductInCart(this.book);
}


 addToCard(book:any){
  this.cartservice.addProductToCart(book)
  
this.toster.info('Item Add to Cart')
this.isProductInCart=true
}
addWishList(book: any) {
  this.cartservice.addProductToWishlist(book);
  this.toster.info('Item Add to Your Wish List')

  this.isProductInWishlist = true;
}
}
