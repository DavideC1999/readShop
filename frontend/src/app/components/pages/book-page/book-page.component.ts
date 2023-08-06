import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/shared/models/Book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{
  
  book!: Book
  
  constructor(activatedRoute: ActivatedRoute, bookService: BookService, private cartService: CartService, private router: Router){
    let bookObservable: Observable<Book>;
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        bookObservable = bookService.getBookById(params.id)
        bookObservable.subscribe((serverBooks) =>{
          this.book = serverBooks
        })
    })
  }

  ngOnInit(): void {}

  addToCart(){
    this.cartService.addToCart(this.book)
    this.router.navigateByUrl('/cart-page')
  }
}
