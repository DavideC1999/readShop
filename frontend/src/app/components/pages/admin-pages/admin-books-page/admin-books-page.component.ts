import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/Book';

@Component({
  selector: 'admin-books-page',
  templateUrl: './admin-books-page.component.html',
  styleUrls: ['./admin-books-page.component.css']
})
export class AdminBooksPageComponent implements OnInit {

  books: Book[] = [];

  constructor(private adminService: AdminService, activatedRoute: ActivatedRoute){
    let booksObservable: Observable<Book[]>;
    activatedRoute.params.subscribe((params) => {
        // richiedo gli ordini per l'utente attivo
        booksObservable = adminService.adminGetAllBooks() 
        // salvo gli ordini per mostrarli nella pagina
        booksObservable.subscribe((serverBooks) =>{
          this.books = serverBooks
        })
    })
  }

  ngOnInit(): void {}

  deleteBook(id: string){
    this.adminService.adminDeleteBook(id)

    this.adminService.adminGetAllBooks().subscribe(books => {
      this.books = books;
    });

    window.location.reload()
  }

}
