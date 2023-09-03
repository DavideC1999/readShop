import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/Book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// home page del sito
export class HomeComponent implements OnInit {
  
  books: Book[] = [];

  constructor(private bookService: BookService, activatedRoute: ActivatedRoute){
    let bookObservable: Observable<Book[]>;
    // i libri presenti nella home page vengono filtrati in base al search term
    // il search term è il termine cercato dall'utente e posto nell'url
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)// se parametro di ricerca presente (richiesta da search bar)
        bookObservable = this.bookService.getAllBooksBySearchTerm(params.searchTerm)
      // vegongo mostrati i liri filtrati. Il filtro è fatto sul db
      else
        bookObservable = bookService.getAll() // senza termine di ricerca

      bookObservable.subscribe((serverBooks) =>{
        this.books = serverBooks // salvo i libri per mostrali nella home page
      })
    })
    
  }

  ngOnInit(): void {}
  
}
