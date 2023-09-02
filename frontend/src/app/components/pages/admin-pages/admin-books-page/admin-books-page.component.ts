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
  bookToEdit: Book = new Book // memorizza il libro da editare
  showEditLabels:boolean = false // per mostrare il form di modifica

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

  // cancella libro
  deleteBook(id: string){
    this.adminService.adminDeleteBook(id)

    this.adminService.adminGetAllBooks().subscribe(books => {
      this.books = books;
      window.location.reload()
    });
  }

  // conferma delle modifiche per l'utente
  saveChanges() { // conferma le modifiche 
    this.showEditLabels = false;
    this.adminService.adminEditBook(this.bookToEdit)
    
    this.adminService.adminGetAllBooks().subscribe(books => {
      this.books = books;
      window.location.reload()
    });
  }

  // apre il form per modificare il libro selezionato
  editBook(book: Book){
    this.bookToEdit = { ...book };
    this.showEditLabels = true;
    window.scrollTo(0, 0);
  }

  // annula modifica
  goBack(){
    this.showEditLabels = false;
  }
}
