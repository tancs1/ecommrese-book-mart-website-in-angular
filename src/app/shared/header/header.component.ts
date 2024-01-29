import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/core/auth-service.service';
import { BooksService } from 'src/app/core/books.service';
import { CartService } from 'src/app/core/cart.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  searchText: any;
  cartItemCount: any;
  wishlistItemCount: any;

  criteria: any[] = ['Price(Low to High)', 'Price(High to Low)', 'Discount(Low to High)', 'Discount(High to Low)'];
  isSortMenuVisible: boolean = false;
  router: any;

  constructor(private messageService: MessageService,private cartService: CartService, private bookService: BooksService ,public authService:AuthServiceService) {}

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe((cartItems: any) => {
    const storedCartCount = localStorage.getItem('cartItemCount');

    // Parse the stored count if it exists
    if (storedCartCount) {
      this.cartItemCount = JSON.parse(storedCartCount);
    }
     this.cartItemCount = cartItems.length;
      localStorage.setItem('cartItemCount', JSON.stringify( this.cartItemCount));
    });
 

    // Subscribe to wishlist changes
    this.cartService.wishlistSubject.subscribe((wishlistItems: any) => {
      // Update wishlist count based on the length of wishlist items
      this.wishlistItemCount = wishlistItems.length;

      // Save updated wishlist count to local storage
      localStorage.setItem('wishlistItemCount', JSON.stringify(this.wishlistItemCount));
    });
     // Get wishlist count from local storage on component initialization
     const storedWishlistCount = localStorage.getItem('wishlistItemCount');

     // Parse the stored count if it exists
     if (storedWishlistCount) {
       this.wishlistItemCount = JSON.parse(storedWishlistCount);
     }
 
   
  }

  sortBook(criterion: any) {
    this.bookService.sortBook(criterion);
  }

  showSortMenu() {
    this.isSortMenuVisible = !this.isSortMenuVisible;
  }

  searchBook(searchText: any) {
    this.bookService.getSearchString(searchText);
  }

// side bar
sidebarState = 'out';
showtext='Hide Menu'
isPriceFilterVisible: boolean=false
priceFilters=[500,1500,2500,3500,4500,5500,7000]
isCategoriesVisible:boolean=false
categories=['Java','Mobile','JavaScript',"Data Science",'Nodejs','Angular','windows','history','general',
"Web Development","Microsoft .NET",'Internet'

]
discountFilters:any = [10,20,30,40];
isDiscountFiltersVisible:boolean=false
  


showPriceFilter(){
this.isCategoriesVisible=false
this.isDiscountFiltersVisible=false
  this.isPriceFilterVisible=!this.isPriceFilterVisible
}
filterBookByPrice(priceFilter:any){
this.bookService.getPriceFilter(priceFilter)
this.isPriceFilterVisible=false
}
showCategories(){
  this.isPriceFilterVisible=false
  this.isDiscountFiltersVisible=false
  this.isCategoriesVisible=!this.isCategoriesVisible
}
filterBooksByCategory(category:any){
  console.log('category');
  
this.bookService.getFilterCategory(category)
this.isCategoriesVisible=false
}
showDiscountFilters(){
  this.isPriceFilterVisible=false
  this.isCategoriesVisible=false
  this.isDiscountFiltersVisible = !this.isDiscountFiltersVisible;
}

filterBooksByDiscount(discountFilter:any){
  this.bookService.getDiscountFilter(discountFilter);
  this.isDiscountFiltersVisible = false;
}
showAlertFlag: boolean = false;

login(){
this.authService.loginshow=true
}



showBottomCenter() {
  this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: 'Logout Successfully' });
}
logout(){
  localStorage.removeItem('LoginUser')
  // this.isAuthenticated = false;
  this.showBottomCenter()
  this.router.navigate(['login']);
}
isLogIn(){
return !!localStorage.getItem('LoginUser')
}

}
