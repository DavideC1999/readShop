import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

// Costante per la memorizzazione locale (local storage) dell'utente
const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // BehaviorSubject per tenere traccia dell'utente corrente (che prende dalla local storage)
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    // Inizializza l'Observable dell'utente con il BehaviorSubject
    this.userObservable = this.userSubject.asObservable()
  }

  // Funzione per ottenere l'utente corrente
  public get currentUser():User{
    return this.userSubject.value
  }

  // Metodo per la richiesta di login al backend
  login(userLogin: IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => { // se la richiesta è andata a buon fine
          // Salva l'utente nell'archivio locale e nel BehaviorSubject
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)

          // toastr è una libreria per mostrare un pop-up
          // in questo caso di successo
          this.toastrService.success(
            `Welcome to readShop ${user.name}!`,
            'Login effettuato con successo' 
          )
        },
        error: (errorResponse) =>{ // richiesta con errore
          // pop-up di errore
          this.toastrService.error(errorResponse.error, 'Login fallito, riprova');
        }
      })
    );
  }
  // Metodo per la registrazione
  register(userRegister: IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => { // a buon fine
          // Salva l'utente nell'archivio locale e nel BehaviorSubject
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to readShop ${user.name}!`,
            'Utente registrato con successo!' 
          )
        },
        error: (errorResponse) =>{ // con errori
          this.toastrService.error(errorResponse.error, 'Registrazione fallita');
        }
      })
    )
  }

  // metodo per il logout, nessuna richiesta http al server
  logout(){
    // Resetta l'utente nel BehaviorSubject e rimuove l'utente dalla local storage
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    //window.location.reload()
  }

  // Metodo privato per salvare l'utente nella local storage
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  // Metodo privato per ottenere l'utente dalla local storage
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User
    return new User() // // Restituisce un utente vuoto se non è presente in archivio
  }
}
