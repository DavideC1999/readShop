import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// componente della header bar
export class HeaderComponent implements OnInit {
  
  cartQuantity = 0;
  user!:User;

  showHeader: boolean = true;

  constructor(private cartService: CartService, private userService:UserService, private router: Router){
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount // mostra pop-up con il num di elementi nel carrello
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser // ottiene l'utente per mostrare il nome sulla header
    })


    // Subscribe to router events to determine the current URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Check if the current URL is the admin page
        this.showHeader = (!currentUrl.includes('/dashboard') && !currentUrl.includes('/addNewBook'));
      }
    });
  }
  ngOnInit(): void {}

  logout(){
    this.userService.logout()
    this.cartService.clearCart()
    this.router.navigateByUrl('/login')
  }

  get isAuth(){
    return this.user.token
  }

  get isAdmin(){
    return this.user.isAdmin
  }
}
