import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
// pagina per checkout e pagamento
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order()
  checkoutForm!: FormGroup // form del checkout
  // nota: il form esiste soltanto per mostrare i dati all'utente. Non è modificabile
  name:string = ''
  address:string = ''

  constructor(private cartService: CartService, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router){
      const cart = cartService.getCart() // ottengo il carrello
      this.order.items = cart.items // salvo gli elementi nel carrello
      this.order.totalPrice = cart.totalPrice // salvo il prezzo totale

      // salvo nome e indirizzo dell'utente
      this.name = this.userService.currentUser.name
      this.address = this.userService.currentUser.address
    }

  ngOnInit(): void {}

  get fc(){
    return this.checkoutForm.controls
  } 

  createOrder(){
    // salvo il nome e l'indirizzo dell'utente dull'ordine
    this.order.name = this.name 
    this.order.address = this.address

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.toastrService.success('Pagamento effettuato correttamente!')
        this.cartService.clearCart()
        this.router.navigateByUrl('/')
      },
      error: (erroResponse) => {
        this.toastrService.error(erroResponse.error, 'Cart')
      }
    })
  }
}
