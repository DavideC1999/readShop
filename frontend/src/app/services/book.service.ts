import { Injectable } from '@angular/core';
import { sample_books } from '../data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BOOKS_BY_SEARCH_URL, BOOKS_URL, BOOK_BY_ID_URL } from '../shared/constants/urls';
import { Book } from '../shared/models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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

}
