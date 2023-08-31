import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard{
    token!: string
    isAdmin!: boolean

    constructor(private userService:UserService, private router:Router){
        this.token = this.userService.currentUser.token
        this.isAdmin = this.userService.currentUser.isAdmin
    }


    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.token && this.isAdmin == true) return true;
        
        if(this.token){
           this.router.navigate(['/'])
           return false;
        } 

        this.router.navigate(['/login'])
        return false;
    }

}