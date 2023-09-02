import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BOOKS_BY_SEARCH_URL, BOOKS_URL, BOOK_ADD_FAVORITE_URL, BOOK_ADD_NEW_URL, BOOK_BY_ID_URL } from '../shared/constants/urls';
import { Book } from '../shared/models/Book';
import { IBook } from '../shared/interfaces/IBook';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpClient, private toastrService:ToastrService) { }
  // richiesta http all'endpoint per ottenere tutti i libri
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(BOOKS_URL);
  }

  // Ottiene libri in base a un termine di ricerca (utilizzata nella search bar)
  getAllBooksBySearchTerm(searchTerm: string){
    return this.http.get<Book[]>(BOOKS_BY_SEARCH_URL + searchTerm)
  }

  // Ottiene un libro per ID
  getBookById(bookId: string):Observable<Book>{
    return this.http.get<Book>(BOOK_BY_ID_URL + bookId)
  }

  // Aggiunge un nuovo libro
  addNewBook(ibook: IBook){
    return this.http.post<Book>(BOOK_ADD_NEW_URL, ibook).pipe(
      tap({
        next: (book) => { // successo
          this.toastrService.success(
            `Libro ${book.name} aggiunto con successo!`
          )
          window.location.reload() // ricarica la pagine per vedere il libro
        },
        error: (errorResponse) =>{ // errore
          this.toastrService.error(errorResponse.error, 'Libro non aggiunto');
        }
      })
    ).subscribe();
  }

  
  // Metodo per aggiungere o rimuovere un libro ai preferiti
  addFavorite(id: string, favorite: boolean){
    // Crea i dati da inviare nella richiesta HTTP
    // viene inviato l'id del libro 
    const requestData = {
      id: id,
      favorite: favorite
    };
    // Effettua una richiesta HTTP POST aggiungere/rimuovere un libro dai preferiti
    return this.http.post(BOOK_ADD_FAVORITE_URL, requestData, { responseType: 'text' })
  }
}
