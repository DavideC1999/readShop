import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private cartService: CartService, private userService:UserService, private router: Router){
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount // mostra pop-up con il num di elementi nel carrello
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser // ottiene l'utente per mostrare il nome sulla header
    })
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
