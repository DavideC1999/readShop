import { Injectable } from '@angular/core';
import { sample_books } from '../data';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BOOKS_BY_SEARCH_URL, BOOKS_URL, BOOK_ADD_NEW_URL, BOOK_BY_ID_URL } from '../shared/constants/urls';
import { Book } from '../shared/models/Book';
import { IBook } from '../shared/interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  toastrService: any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(BOOKS_URL);
  }

  getAllBooksBySearchTerm(searchTerm: string){
    return this.http.get<Book[]>(BOOKS_BY_SEARCH_URL + searchTerm)
  }

  getBookById(bookId: string):Observable<Book>{
    return this.http.get<Book>(BOOK_BY_ID_URL + bookId)
  }

  addNewBook(ibook: IBook){
    return this.http.post<Book>(BOOK_ADD_NEW_URL, ibook).pipe(
      tap({
        next: (book) => {
          this.toastrService.success(
            `Libro ${book.name} aggiunto con successo!`)
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Libro non aggiunto');
        }
      })
    )
  }

}
