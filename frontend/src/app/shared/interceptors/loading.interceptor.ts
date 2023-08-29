import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

// Variabile globale per tenere traccia delle richieste in sospeso
var pendingRequests = 0;

@Injectable()

// questo interceptor viene utilizzato per applicare un caricamento visivo ogni volta 
// che viene fatta una richiesta http al server
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Mostra il caricamento
    this.loadingService.showLoading()

    // incrementa le richieste in sospeso
    pendingRequests = pendingRequests + 1

    // Esegue la richiesta HTTP e ascolta gli eventi associati alla risposta
    return next.handle(request).pipe(
      tap({
        next: (event) =>{
          // Se l'evento è una risposta HTTP completata (HttpEventType.Response), nasconde il feedback di caricamento
          if(event.type === HttpEventType.Response){
            this.handleHideLoading()
          }
        },
        error: (_) => {
          // In caso di errore nella richiesta, nasconde comunque il feedback di caricamento
          this.handleHideLoading()
        }
      })
    );
  }
  
  handleHideLoading(){
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0){
      this.loadingService.hideLoading()
    }
  }
}
