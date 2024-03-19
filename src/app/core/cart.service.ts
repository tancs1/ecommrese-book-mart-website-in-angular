import { Injectable, OnInit } from '@angular/core';
import { Subject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService  {
  cartProduct: any[] = [];
  wishlist: any[] = [];

  cartSubject = new Subject();
  wishlistSubject = new Subject();
  wishlistProducts: any[] = [];
 cartcount:any
 wishlistcount:any
  constructor() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
      this.wishlistSubject.next([...this.wishlist]);
    }
    const storedCart = localStorage.getItem('cartlist');
    if (storedCart) {
      this.cartProduct = JSON.parse(storedCart);
      this.cartSubject.next([...this.cartProduct]);
    }
  }

  // addProductToCart(product: any, userId: string) {
  //   let currentBook = { userId, ...product, count: 1 };
  //   this.cartProduct.push(currentBook);
  //   this.cartSubject.next(this.cartProduct);
  
  //   this.updateCartAndLocalStorage();
  // }
  addProductToCart(product: any) {
    debugger
    let cartitemlists
    let count
    // Check if the user is logged in
    
    const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
    if (loginUser && loginUser.length > 0) {
      const userId = loginUser[0].id; // Assuming your user object has an 'id' property
      // Assuming your user object has an 'id' property
      cartitemlists= this.cartProduct.filter(product => product.userId === userId);
      count=cartitemlists.length
      this.cartcount=count
      localStorage.setItem('cartcount',this.cartcount);
      let currentBook = { userId, ...product, count: 1 };
      this.cartProduct.push(currentBook);
      this.cartSubject.next(this.cartProduct);

  // this.cartcount=this.cartProduct.length;
  // localStorage.setItem('cartcount',this.cartcount);
      this.updateCartAndLocalStorage();
    } else {
      // Handle the case when the user is not logged in
      console.log('User not logged in. Please handle this case accordingly.');
    }
  }
  // create a function to add two


  addProductToWishlist(product: any) {
    // Check if the user is logged in
    debugger
    let cartitemlists
    let count
    const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
    if (loginUser && loginUser.length > 0) {
      const userId = loginUser[0].id; // Assuming your user object has an 'id' property
      cartitemlists= this.cartProduct.filter(product => product.userId === userId);
      count=cartitemlists.length
      this.wishlistcount=count
      localStorage.setItem('wishlistcount',this.wishlistcount);
      let currentBook = { userId, ...product, count: 1 };
      this.wishlist.push(currentBook);
      this.wishlistSubject.next(this.wishlist);
      this.wishlistcount=this.wishlist
      localStorage.setItem('wishlistcount',this.wishlistcount);
      this.updateWishListAndLocalStorage();
    } else {
      // Handle the case when the user is not logged in
      console.log('User not logged in. Please handle this case accordingly.');
    }
  }
  
  
  getAllCartItem() {
      debugger
    let cartitemlists
    let count
     // Check if the user is logged in
  const storedLoginUser = localStorage.getItem('LoginUser');
  const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;

  if (loginUser && loginUser.length > 0) {
    {const userId = loginUser[0].id; // Assuming your user object has an 'id' property
cartitemlists= this.cartProduct.filter(product => product.userId === userId);
count=cartitemlists.length;

// console.log('servicecount',count);
      this.counfun(count)
      this.cartcount=count
      localStorage.setItem('cartcount',this.cartcount)
     
    console.log(cartitemlists);
   
    
 return cartitemlists}

  } else {
    // If the user is not logged in, return an empty array or handle it based on your requirements
    return [];
  }
  }
  cartscounting:any
  counfun(count:any){
    this.cartscounting=count;
    console.log('servicecount',this.cartscounting);
    localStorage.setItem('cartcount',JSON.stringify(this.cartscounting))
    return this.cartscounting;
  }

  getAllWishlistItem() {
    debugger
    // Check if the user is logged in
    let wishlistitemCount;
    let count
    const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
    if (loginUser && loginUser.length > 0) {
      const userId = loginUser[0].id; // Assuming your user object has an 'id' property
  wishlistitemCount=this.wishlist.filter(product => product.userId === userId);
      count=wishlistitemCount.length;
      this.counwishfun(count)
      this.wishlistcount=count
      localStorage.setItem('wishlistcount',this.wishlistcount)
      return wishlistitemCount;
      // Filter the wishlist products based on the user ID
     
    } else {
      // If the user is not logged in, return an empty array or handle it based on your requirements
      return [];
    }
  }
  wishcounting:any
  counwishfun(count:any){
    this.wishcounting=count;
    console.log('servicewishcount',this.wishcounting);
    localStorage.setItem('wishlistcount',JSON.stringify(this.wishcounting))
    return this.wishcounting;
  }
  
  getPriceDetailsInCartItem(product:any){
    let priceDetails={
      discountedPrice: (product.price * product.count) - (product.discount) / 100 * (product.price*(product.count)),
    price:product.price*product.count
    }
    return priceDetails
  }
  incProductCount(product:any){
    let index=this.cartProduct.findIndex((item)=>{
      return item.isbn===product.isbn
    })
    this.cartProduct[index].count++;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProduct);
  }
  decProductCount(product:any){
    let index=this.cartProduct.findIndex((item)=>{
      return item.isbn===product.isbn
    })
    this.cartProduct[index].count--;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProduct);
  }
  removeItemFromCart(product:any){
    debugger
let removeConfirm=window.confirm('Are You Sure')
if (removeConfirm){
  let index=this.cartProduct.findIndex((item)=>{
    return item.isbn===product.isbn
  })
  this.cartProduct.splice(index,1)
  this.cartSubject.next(this.cartProduct);
  const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
    let cartitemlists
    let count
  if (loginUser && loginUser.length > 0) {
  {const userId = loginUser[0].id; // Assuming your user object has an 'id' property
cartitemlists= this.cartProduct.filter(product => product.userId === userId);
count=cartitemlists.length;
this.cartcount=count
window.location.reload()
localStorage.setItem('cartcount',this.cartcount)
  }}
  
  this.updateCartAndLocalStorage();
}
  }
  removeItemFromWishlist(product: any) {
    let index = this.wishlist.findIndex((item) => item.isbn === product.isbn);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.wishlistSubject.next([...this.wishlist]);
      const storedLoginUser = localStorage.getItem('LoginUser');
      const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
      let cartitemlists
      let count
    if (loginUser && loginUser.length > 0) {
    {const userId = loginUser[0].id; // Assuming your user object has an 'id' property
  cartitemlists= this.cartProduct.filter(product => product.userId === userId);
  count=cartitemlists.length;
  this.wishlistcount=count
  localStorage.setItem('wishlistcount',this.wishlistcount)
    }}
    this.updateWishListAndLocalStorage()
    }
  }
  getBilling(cartItems:any){
    let billingDetails = {
      price: 0,
      discount: 0,
      delivery: 0
    };
    cartItems.forEach((item:any)=>{
      billingDetails.price = billingDetails.price + (item.price*item.count);
      billingDetails.discount = billingDetails.discount + ((item.discount/100*item.price)*item.count);
      billingDetails.price>=1500 ? billingDetails.delivery = 0 : billingDetails.delivery = 50;
    });
    return billingDetails;
  }

  getDiscountedPrice(currentItem:any){
    return currentItem.price-(currentItem.discount)/100*currentItem.price;
  }
  isProductInCart(product: any): boolean {
    // Check if the user is logged in
    const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
    if (loginUser && loginUser.length > 0) {
      const userId = loginUser[0].id;
      // Check if the product with the same ISBN is in the cart for the current user
      const isProductInUserCart = this.cartProduct.some((p) => p.userId === userId && p.isbn === product.isbn);
      return isProductInUserCart;
    }
  
    return false;
  }
  isProductInWishlist(product: any): boolean {
    // Check if the user is logged in
    const storedLoginUser = localStorage.getItem('LoginUser');
    const loginUser: any = storedLoginUser ? JSON.parse(storedLoginUser) : null;
  
    if (loginUser && loginUser.length > 0) {
      const userId = loginUser[0].id;
      // Check if the product with the same ISBN is in the wishlist for the current user
      const isProductInUserWishlist = this.wishlist.some((p) => p.userId === userId && p.isbn === product.isbn);
      return isProductInUserWishlist;
    }
  
    return false;
  }
  
  private updateCartAndLocalStorage() {
    this.cartSubject.next([...this.cartProduct]);
    
    localStorage.setItem('cartlist', JSON.stringify(this.cartProduct));
  }

  private updateWishListAndLocalStorage() {
    this.wishlistSubject.next([...this.wishlist]);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}