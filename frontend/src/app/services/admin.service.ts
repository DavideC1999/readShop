import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ADMIN_DELETE_BOOK_URL, ADMIN_DELETE_USER_URL, ADMIN_EDIT_BOOK_URL, ADMIN_GET_ALL_BOOKS_URL, ADMIN_GET_ALL_ORDERS_URL, ADMIN_GET_ALL_USERS_URL, BOOKS_BY_SEARCH_URL, BOOKS_URL, BOOK_ADD_NEW_URL, BOOK_BY_ID_URL } from '../shared/constants/urls';
import { Book } from '../shared/models/Book';
import { IBook } from '../shared/interfaces/IBook';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/User';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  page: number = 1

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  // BOOKS ---------------------------------------------------------

  adminGetAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(ADMIN_GET_ALL_BOOKS_URL);
  }

  adminDeleteBook(id: string){
    const requestData = {
      id: id,
    };
    // Effettua una richiesta HTTP POST per eliminare il libro
    return this.http.post(ADMIN_DELETE_BOOK_URL, requestData, { responseType: 'text' }).pipe(
      tap({
        next: () => { // successo
          
          //window.location.reload()
          // pop-up di successo
          this.toastrService.success(
            'Libro eliminato con successo'
          )
        },
        error: (errorResponse: { error: string | undefined; }) =>{// errore
          // mostra pop-up di errore
          this.toastrService.error(errorResponse.error, 'Libro non eliminato');
        }
      })
    ).subscribe(); // Sottoscrive all'Observable per eseguire effettivamente la richiesta
  }

  adminEditBook(book: Book){
    // Effettua una richiesta HTTP POST per eliminare il libro
    return this.http.post(ADMIN_EDIT_BOOK_URL, book, { responseType: 'text' }).pipe(
      tap({
        next: () => { // successo
          
          //window.location.reload()
          // pop-up di successo
          this.toastrService.success(
            'Libro modificato con successo'
          )
        },
        error: (errorResponse: { error: string | undefined; }) =>{// errore
          // mostra pop-up di errore
          this.toastrService.error(errorResponse.error, 'Libro non modificato');
        }
      })
    ).subscribe(); // Sottoscrive all'Observable per eseguire effettivamente la richiesta
  }


  // ORDERS -----------------------------------------------------------

  adminGetAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ADMIN_GET_ALL_ORDERS_URL)
  }

  // USERS ----------------------------------------------------------------

  adminGetAllUsers():Observable<User[]>{
    return this.http.get<User[]>(ADMIN_GET_ALL_USERS_URL)
  }

  adminDeleteUser(id: string){
    const requestData = {
      id: id,
    };
    // Effettua una richiesta HTTP POST per eliminare l'utente
    return this.http.post(ADMIN_DELETE_USER_URL, requestData, { responseType: 'text' }).pipe(
      tap({
        next: () => { // successo
          
          //window.location.reload()
          // pop-up di successo
          this.toastrService.success(
            'Utente eliminato con successo'
          )
        },
        error: (errorResponse: { error: string | undefined; }) =>{// errore
          // mostra pop-up di errore
          this.toastrService.error(errorResponse.error, 'Utente non eliminato');
        }
      })
    ).subscribe(); // Sottoscrive all'Observable per eseguire effettivamente la richiesta
  }

  // GESTIONE DELLA VISUALIZZAZIONE DEI CONTENUTI NELLA PAGINA

  getPage():number {
    return this.getPageToLocalstorage()
  }

  setPage(page: number): void {
    this.setPageToLocalstorage( page)
  }

  private setPageToLocalstorage(page: number){
    localStorage.setItem('PAGE', JSON.stringify(page))
  }

  private getPageToLocalstorage():number{
    const pageJSON = localStorage.getItem('PAGE')
    if(pageJSON) return JSON.parse(pageJSON) 
    return 1
  }
}
