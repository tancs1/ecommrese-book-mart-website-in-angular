// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class BooksService {
// baseUrl='http://localhost:3000/books'
// books:any[]=[]
// sortCritertion:any;
// sorSubject=new Subject()
// filteredBook:any[]=[]
// priceFilter:any
// priceFilterSubject=new Subject()
// filterCategorySubject=new Subject()
//   filterCategory: any;
//   discountFilterSubject=new Subject()
//   discountFilter: any;
//   constructor( private http:HttpClient) { }
//   getAllBooks(){
//    return this.http.get(this.baseUrl).pipe(map((book:any)=>{
//     this.books=book
//     this.filteredBook=this.books
//     return book
//    }))
    
//   }
//   getSortBookCriterion(criteria:any){
// this.sortCritertion=criteria
// this.sorSubject.next(this.sortCritertion)
//   }
//   sortBook(criteria:any){
//     switch(criteria){
//       case'Price(Low to High)':
//       this.filteredBook.sort((a:any ,b:any)=>{
//         if(a.price< b.price){
//           return -1
//         }
//         if(a.price >b.price){
//           return 1
//         }
//         return 0
//       })
//       break;
//       case'Price(High to Low)':
//       this.filteredBook.sort((a:any ,b:any)=>{
//         if(a.price< b.price){
//           return 1
//         }
//         if(a.price >b.price){
//           return -1
//         }
//         return 0
//       })
//       break;
//       case'Discount(Low to High)':
//       this.filteredBook.sort((a:any ,b:any)=>{
//         if(a.discount< b.discount){
//           return -1
//         }
//         if(a.discount >b.discount){
//           return 1
//         }
//         return 0
//       })
//       break;
//       case'Discount(High to Low)':
//       this.filteredBook.sort((a:any ,b:any)=>{
//         if(a.discount< b.discount){
//           return 1
//         }
//         if(a.discount >b.discount){
//           return -1
//         }
//         return 0
//       })
//       break;
//     }
//     console.log(this.filteredBook);
//     return this.filteredBook
  
    
//   }

//   getPriceFilter(price:any){
// this.priceFilter=price
// this.priceFilterSubject.next((this.priceFilter))
//   }
//   getFilteredBookByPrice(price:any){
//     return  this.filteredBook=this.books.filter((book:any)=>{
//       return book.price<=price
//     })
  
//   }
 


//   getFilterCategory(category:any){
//     this.filterCategory=category
//     console.log('filter'+ this.filterCategory);
    
//     this.filterCategorySubject.next((this.filterCategory))
//   }
//   getFilterBookByCategory(category:any){
//     return this.filteredBook=this.books.filter((book:any)=>{
//       console.log(book.categories);
    
    
//       return  book.categories.includes(category)
   
//         })
//   }
//   getDiscountFilter(discount:any){
//     this.discountFilter = discount;
//     this.discountFilterSubject.next(this.discountFilter);
//   }

//   getFilteredBooksByDiscount(discount:any){
//     return this.filteredBook = this.books.filter((book:any)=>{
//       return book.discount>=discount;
//     })
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
baseUrl='http://localhost:3000/books'
books:any[]=[]
searchText:any = '';
searchSubject = new Subject();
sortCritertion:any;
sorSubject=new Subject()
filteredBook:any[]=[]
priceFilter:any
priceFilterSubject=new Subject()
filterCategorySubject=new Subject()
  filterCategory: any;
  discountFilterSubject=new Subject()
  discountFilter: any;
  constructor( private http:HttpClient) { }



  getAllBooks(){
   return this.http.get(this.baseUrl).pipe(map((book:any)=>{
    this.books=book
    this.filteredBook=this.books
    return book
   }))
    
  }
  getSearchString(searchText:any){
    this.searchText = searchText;
    console.log(this.searchText);
    this.searchSubject.next(this.searchText);
  }

  getCurrentBook(id:any){
    return this.books.find((book:any)=>{
      return book.isbn === id.isbn;
    })
  }

  getSortBookCriterion(criteria:any){
this.sortCritertion=criteria
this.sorSubject.next(this.sortCritertion)
  }
  sortBook(criteria:any){
    switch(criteria){
      case'Price(Low to High)':
      this.filteredBook.sort((a:any ,b:any)=>{
        if(a.price< b.price){
          return -1
        }
        if(a.price >b.price){
          return 1
        }
        return 0
      })
      break;
      case'Price(High to Low)':
      this.filteredBook.sort((a:any ,b:any)=>{
        if(a.price< b.price){
          return 1
        }
        if(a.price >b.price){
          return -1
        }
        return 0
      })
      break;
      case'Discount(Low to High)':
      this.filteredBook.sort((a:any ,b:any)=>{
        if(a.discount< b.discount){
          return -1
        }
        if(a.discount >b.discount){
          return 1
        }
        return 0
      })
      break;
      case'Discount(High to Low)':
      this.filteredBook.sort((a:any ,b:any)=>{
        if(a.discount< b.discount){
          return 1
        }
        if(a.discount >b.discount){
          return -1
        }
        return 0
      })
      break;
    }
    console.log(this.filteredBook);
    return this.filteredBook
  
    
  }

  getPriceFilter(price:any){
this.priceFilter=price
this.priceFilterSubject.next((this.priceFilter))
  }
  getFilteredBookByPrice(price:any){
    return  this.filteredBook=this.books.filter((book:any)=>{
      return book.price<=price
    })
  
  }
 


  getFilterCategory(category:any){
    this.filterCategory=category
    console.log('filter'+ this.filterCategory);
    
    this.filterCategorySubject.next((this.filterCategory))
  }
  getFilterBookByCategory(category:any){
    return this.filteredBook=this.books.filter((book:any)=>{
      console.log(book.categories);
    
    
      return  book.categories.includes(category)
   
        })
  }
  getDiscountFilter(discount:any){
    this.discountFilter = discount;
    this.discountFilterSubject.next(this.discountFilter);
  }

  getFilteredBooksByDiscount(discount:any){
    return this.filteredBook = this.books.filter((book:any)=>{
      return book.discount>=discount;
    })
  }
}