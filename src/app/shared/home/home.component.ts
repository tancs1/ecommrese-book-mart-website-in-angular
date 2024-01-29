// // home.component.ts
// import { Component, OnInit } from '@angular/core';
// import { BooksService } from 'src/app/core/books.service';

// @Component({
//     selector: 'app-home',
//     templateUrl: './home.component.html',
//     styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//     books: any;
//     currentPage: number = 1;
//     itemsPerPage: number = 9; // Adjust the number of items per page
//     pagedBooks: any[] = [];
//     pages: number[] = [];

//     constructor(private booksService: BooksService) {}

//     ngOnInit(): void {
//         this.booksService.getAllBooks().subscribe((res) => {
//             this.books = res;
//             this.calculatePages();
//             this.loadPagedBooks();
//         });

//         this.booksService.sorSubject.subscribe((sortCriterion: any) => {
//             this.books = this.booksService.sortBook(sortCriterion);
//             this.loadPagedBooks();
//         });

//         this.booksService.priceFilterSubject.subscribe((price: any) => {
//             this.booksService.getAllBooks().subscribe((res) => {
//                 this.books = res;
//                 this.books = this.booksService.getFilteredBookByPrice(price);
//                 this.calculatePages();
//                 this.loadPagedBooks();
//             });
//         });

//         this.booksService.filterCategorySubject.subscribe((category: any) => {
//             this.booksService.getAllBooks().subscribe((res) => {
//                 this.books = res;
//                 this.books = this.booksService.getFilterBookByCategory(category);
//                 this.calculatePages();
//                 this.loadPagedBooks();
//             });
//         });

//         this.booksService.discountFilterSubject.subscribe((discount: any) => {
//             this.booksService.getAllBooks().subscribe((res) => {
//                 this.books = res;
//                 this.books = this.booksService.getFilteredBooksByDiscount(discount);
//                 this.calculatePages();
//                 this.loadPagedBooks();
//             });
//         });
//     }

//     calculatePages() {
//         const totalPages = Math.ceil(this.books.length / this.itemsPerPage);
//         const maxButtons = 10; // Maximum number of buttons to display
    
//         if (totalPages <= maxButtons) {
//             // If total pages are less than or equal to the max buttons, display all pages
//             this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
//         } else {
//             // If total pages are more than max buttons, display a subset with "Next" and "Previous"
//             const halfButtons = Math.floor(maxButtons / 2);
//             let startPage = Math.max(1, this.currentPage - halfButtons);
//             let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
//             if (endPage - startPage + 1 < maxButtons) {
//                 // Adjust startPage when nearing the last page
//                 startPage = Math.max(1, endPage - maxButtons + 1);
//             }
    
//             this.pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
//         }
//     }
    

//     changePage(page: number) {
//         this.currentPage = page;
//         this.calculatePages(); // Recalculate pages
//         this.loadPagedBooks();
//     }
    

//     loadPagedBooks() {
//         const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//         const endIndex = startIndex + this.itemsPerPage;
//         this.pagedBooks = this.books.slice(startIndex, endIndex);
//     }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/auth-service.service';
import { BooksService } from 'src/app/core/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
books:any;
searchText: any;
loading:boolean=false;
constructor(public booksService:BooksService, public authService:AuthServiceService,private router:Router )
// constructor(public booksService:BooksService, private router:Router )
{}
  ngOnInit(): void {
    this.loading=true
    this.booksService.getAllBooks().subscribe((res)=>{
      this.books=res
    this.loading=false;
    });

    this.booksService.sorSubject.subscribe((sortCritertion:any)=>{
      this.books=this.booksService.sortBook(sortCritertion)
     
      
    })
    this.booksService.searchSubject.subscribe((searchString:any)=>{
      this.searchText = searchString;
    });

    this.booksService.priceFilterSubject.subscribe((price:any)=>
    {
      this.booksService.getAllBooks().subscribe((res)=>{
        this.books=res
        this.booksService.priceFilter
        this.books=this.booksService.getFilteredBookByPrice(price)
      })
    })
    this.booksService.filterCategorySubject.subscribe((category:any)=>{
      this.booksService.getAllBooks().subscribe((res)=>{
        this.books = res;
        
        this.books=this.booksService.getFilterBookByCategory(category)
       
        
      });
    })
    this.booksService.discountFilterSubject.subscribe((discount:any)=>{
      this.booksService.getAllBooks().subscribe((res)=>{
        this.books = res;
        this.books = this.booksService.getFilteredBooksByDiscount(discount);
        
        
      });
    })
  }

}