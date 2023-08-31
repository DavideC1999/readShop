import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private userService:UserService, private router:Router){}

  // viene utilizzata in angular per creare una guard. cioè un meccanismo che consente
  // di controllare se un utente può o non accedere a una determinata rotta
  // viene richiamata in 'app-routing-module.ts' quando si creare una nuova rotta
  // che richiede l'autenticazione per essere navigata
  canActivate(
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Controlla se esiste un token nell'utente corrente
    if(this.userService.currentUser.token) return true; // Se c'è un token, l'accesso è consentito, quindi ritorna true
    
    // Se non c'è un token, reindirizza l'utente alla pagina di login
    // e include il returnUrl nei parametri della navigazione
    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }

}