import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject per tenere traccia dello stato di caricamento
  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  constructor() { }

  // Metodo privato per mostrare l'indicatore di caricamento
  showLoading(){
    // Imposta il valore del BehaviorSubject su true per indicare che il caricamento è attivo
    this.isLoadingSubject.next(true)
  }

  // Metodo privato per nascondere l'indicatore di caricamento
  hideLoading(){
    this.isLoadingSubject.next(false)
  }

  // Proprietà per ottenere lo stato di caricamento come un Observable
  get isLoading(){
    return this.isLoadingSubject.asObservable()
  }
}
