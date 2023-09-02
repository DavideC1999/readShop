import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_DELETE_URL, ORDER_GET_ALL_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private toastrService:ToastrService) { }

  // Metodo per creare un nuovo ordine
  create(order: Order){
    // richiesta http all'endpoint con le informazioni sull'ordine come parametri della richiesta
    const req = this.http.post<Order>(ORDER_CREATE_URL, order)
    return req
  }

  // Metodo per ottenere tutti gli ordini dell'utente corrente
  getAllOrders(data: UserService){
    // Ottieni l'utente corrente dal servizio UserService
    const currentUser = data.currentUser;
    // Crea i dati da inviare nella richiesta HTTP
    // nota: gli ordini vengono filtrati in base all'id dell'utente memorizzato nel db per ogni ordine.
    // esso garantisce che l'ordine sia relativo al singolo utente
    const requestData = {
      userId: currentUser.id,
    };

    // Effettua una richiesta HTTP POST per ottenere tutti gli ordini dell'utente corrente
    return this.http.post<Order[]>(ORDER_GET_ALL_URL, requestData);
  }

  // Metodo per eliminare un ordine
  deleteOrder(id: string){
    // Crea i dati da inviare nella richiesta HTTP
    // viene inviato l'id dell'ordine da eliminare 
    const requestData = {
      id: id,
    };
    // Effettua una richiesta HTTP POST per eliminare l'ordine
    return this.http.post(ORDER_DELETE_URL, requestData, { responseType: 'text' }).pipe(
      tap({
        next: () => { // successo
          
          //window.location.reload()
          // pop-up di successo
          this.toastrService.success(
            'Ordine eliminato con successo'
          )
        },
        error: (errorResponse: { error: string | undefined; }) =>{// errore
          // mostra pop-up di errore
          this.toastrService.error(errorResponse.error, 'Ordine non eliminato');
        }
      })
    ).subscribe(); // Sottoscrive all'Observable per eseguire effettivamente la richiesta
  }
}
