import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/core/books.service';
import { CartService } from 'src/app/core/cart.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  wishlistItemCount: any;
  wishlistItems: any;

  currentProduct:any;
  discountedPrice:any;
  isProductInCart = false;
  constructor(private toster:ToastrService, private activatedRoute: ActivatedRoute, private cartService:CartService,private booksService:BooksService) {}

  ngOnInit(): void {
   
    
   
    // Load wishlist data from local storage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistItems = JSON.parse(storedWishlist);
      this.updateWishlistCount();
    }

    this.cartService.wishlistSubject.subscribe((wishlistItems: any) => {
      // Update wishlist data
      this.wishlistItems = wishlistItems;
      console.log(this.wishlistItems);
      
      this.updateWishlistCount();

      // Save wishlist data to local storage
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    });
    this.discountedPrice = this.cartService.getDiscountedPrice(this.wishlistItems);
    this.isProductInCart = this.cartService.isProductInCart(this.wishlistItems);
  }

  updateWishlistCount() {
    this.wishlistItemCount = this.wishlistItems.length;
  }

  removeItemFromWishlist(item: any) {

    this.cartService.removeItemFromWishlist(item)
  }
  addToCart(book:any){   
    this.toster.success('Item Add to Cart')
    this.cartService.addProductToCart(book);
    this.isProductInCart = true;
   this.removeItemFromWishlist(book)
  }
}






