import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
// l'interceptor consente di intercettare e modificare le richieste http prima 
// che vengano inviate al server o le risposte verso l'applicazione

// in questo caso è utilizzato per porre sull'header di ogni richiesta http
// verso il server un head chiamato access_token con il token dell'utente (se autenticato)
export class AuthInterceptor implements HttpInterceptor {
  // costruttore che prende in ingresso lo userService
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ottieni l'utente corrente dal servizio UserService
    const user = this.userService.currentUser

    // Verifica se l'utente ha un token valido
    if(user.token){
      // Se l'utente ha un token valido, aggiungi l'header "access_token" alla richiesta HTTP
      request = request.clone({
        setHeaders:{
          access_token: user.token
        }
      })
    }
    // Passa la richiesta al gestore HTTP successivo (il gestore effettivo della richiesta)
    return next.handle(request);
  }
}
