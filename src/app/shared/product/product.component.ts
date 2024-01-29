import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/cart.service';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/core/auth-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
 @Input()book:any
  isProductInCart: boolean=false;
  isProductInWishlist: boolean=false;
  id:any;
  value!: number;
 constructor( private messageService: MessageService,
  private cartservice:CartService,
  public authService:AuthServiceService,
  ){}
 ngOnInit(): void {
  this.id = {'isbn': this.book.isbn};
  this.isProductInCart = this.cartservice.isProductInCart(this.book);
}
showTopCenter() {
  this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Product Add To Cart Successfully' });
}
showTopCenter2() {
  this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Product Add To Wish List Successfully' });
}

 addToCard(book:any){
  this.cartservice.addProductToCart(book)
  this.showTopCenter()
 
  this.isProductInCart=true
 }
 addWishList(book: any) {
  this.cartservice.addProductToWishlist(book);
  this.showTopCenter2()
  this.isProductInWishlist = true;
}
}
