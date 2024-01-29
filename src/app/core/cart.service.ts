// import { Injectable } from '@angular/core';
// import { Subject, count } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
// cartProduct:any[]=[]
//   constructor() { }
// cartSubject=new Subject
//   addProductToCart(product:any){
//     let curentBook={...product, count:1}
//     this.cartProduct.push(curentBook)
//     this.cartSubject.next(this.cartProduct )
//   }
//   getAllCartItem(){
//     return this.cartProduct
//   }
//   getPriceDetailsInCartItem(product:any){
//     let priceDetails={
//       discountedPrice: (product.price * product.count) - (product.discount) / 100 * (product.price*(product.count)),
//     price:product.price*product.count
//     }
//     return priceDetails
//   }
//   incProductCount(product:any){
//     let index=this.cartProduct.findIndex((item)=>{
//       return item.isbn===product.isbn
//     })
//     this.cartProduct[index].count++;
//     this.getPriceDetailsInCartItem(product);
//     this.cartSubject.next(this.cartProduct);
//   }
//   decProductCount(product:any){
//     let index=this.cartProduct.findIndex((item)=>{
//       return item.isbn===product.isbn
//     })
//     this.cartProduct[index].count--;
//     this.getPriceDetailsInCartItem(product);
//     this.cartSubject.next(this.cartProduct);
//   }
//   removeItemFromCart(product:any){
// let removeConfirm=window.confirm('Are You Sure')
// if (removeConfirm){
//   let index=this.cartProduct.findIndex((item)=>{
//     return item.isbn===product.isbn
//   })
//   this.cartProduct.splice(index,1)
//   this.cartSubject.next(this.cartProduct);
// }
//   }
//   getBilling(cartItems:any){
//     let billingDetails = {
//       price: 0,
//       discount: 0,
//       delivery: 0
//     };
//     cartItems.forEach((item:any)=>{
//       billingDetails.price = billingDetails.price + (item.price*item.count);
//       billingDetails.discount = billingDetails.discount + ((item.discount/100*item.price)*item.count);
//       billingDetails.price>=1500 ? billingDetails.delivery = 0 : billingDetails.delivery = 50;
//     });
//     return billingDetails;
//   }

   
  
// }
// cart.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProduct: any[] = [];
  wishlist: any[] = [];

  cartSubject = new Subject();
  wishlistSubject = new Subject();

  constructor( ) {
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

  addProductToCart(product: any) {
    let currentBook = { ...product, count: 1 };
    this.cartProduct.push(currentBook);
    this.cartSubject.next(this.cartProduct);
  
    this.updateCartAndLocalStorage();
  }


  addProductToWishlist(product: any) {
    const isProductInWishlist = this.wishlist.some((item) => item.id === product.id);
    if (!isProductInWishlist) {
    let currentBook = { ...product, count: 1 };
    this.wishlist.push(currentBook);
    this.wishlistSubject.next(this.wishlist);
    this.updateWishListAndLocalStorage()  
    }
  }

  getAllCartItem() {
    return this.cartProduct;
  }

  getAllWishlistItem() {
    return this.wishlist;
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
let removeConfirm=window.confirm('Are You Sure')
if (removeConfirm){
  let index=this.cartProduct.findIndex((item)=>{
    return item.isbn===product.isbn
  })
  this.cartProduct.splice(index,1)
  this.cartSubject.next(this.cartProduct);
  this.updateCartAndLocalStorage();
}
  }
  removeItemFromWishlist(product: any) {
    let index = this.wishlist.findIndex((item) => item.isbn === product.isbn);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.wishlistSubject.next([...this.wishlist]);

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
  isProductInCart(product:any){
    let book = this.cartProduct.find((p)=>{
      return p.isbn === product.isbn
    })
    if(book){
      return true
    }
    return false
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