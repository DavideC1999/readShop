import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
// pagina che mosta le informazioni sul profilo dell'utente
export class ProfilePageComponent implements OnInit{
  user!: User

  constructor(
    private userService: UserService, 
    private adminService: AdminService, 
    private cartService: CartService,
    private router: Router){
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser // recupero l'orbservable dell'utente per mostralo nella pagina
    })
  }
  ngOnInit(): void {}

  // cancellazione dell'utente
  deleteUser(id: string){
    this.adminService.adminDeleteUser(id)

    this.userService.logout()
    this.cartService.clearCart()
    this.router.navigateByUrl('/login')
  }
}
