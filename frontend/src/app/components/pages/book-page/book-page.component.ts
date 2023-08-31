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
// pagina che mostra il singolo libro
export class BookPageComponent implements OnInit{
  
  book!: Book
  
  constructor(activatedRoute: ActivatedRoute, bookService: BookService, private cartService: CartService, private router: Router){
    let bookObservable: Observable<Book>;
    activatedRoute.params.subscribe((params) => {
      if(params.id) // l'id del libro viene passato come parametro dell'url
        bookObservable = bookService.getBookById(params.id)
        bookObservable.subscribe((serverBooks) =>{
          this.book = serverBooks // salvo il libro per mostrarne i dati
        })
    })
  }

  ngOnInit(): void {}
  // funzione per aggiungere il libro nel carrello 
  addToCart(){
    this.cartService.addToCart(this.book) // richiama il cart service
    this.router.navigateByUrl('/cart-page') // manda l'utente al carrello
  }
}
