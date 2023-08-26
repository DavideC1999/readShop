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
export class HeaderComponent implements OnInit {
  
  cartQuantity = 0;
  user!:User;
  constructor(cartService: CartService, private userService:UserService, private router: Router){
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser
    })
  }
  ngOnInit(): void {
    console.log(this.isAdmin)
  }

  logout(){
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }

  get isAuth(){
    return this.user.token
  }

  get isAdmin(){
    return this.user.isAdmin
  }
}
