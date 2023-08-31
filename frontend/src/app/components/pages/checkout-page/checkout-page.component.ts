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
  // nota: il form esiste poichè do la possibilità all'utente di poter modificare i campi
  // nome e indirizzo dell'ordine. 
  // Nel db l'ordine viene associato all'utente tramite l'id utente, quindi rimane l'univocità
  isSubmitted = false
  name: string = ''
  address: string = ''
  idUtente: string = ''

  constructor(private cartService: CartService, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router){
      const cart = cartService.getCart() // ottengo il carrello
      this.order.items = cart.items // salvo gli elementi nel carrello
      this.order.totalPrice = cart.totalPrice // salvo il prezzo totale

      // salvo nome, indirizzo e id dell'utente
      this.name = this.userService.currentUser.name
      this.address = this.userService.currentUser.address
      this.idUtente = this.userService.currentUser.id
    }

  ngOnInit(): void {
    // init del form
    this.checkoutForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      address: [this.address, Validators.required]
    })
  }

  get fc(){
    return this.checkoutForm.controls
  }

  // funzione per la creazione dell'ordine 
  createOrder(){
    // controlli sulla form
    this.isSubmitted = true
    if(this.checkoutForm.invalid) return

    // salvo il nome, l'indirizzo e l'id dell'utente sull'ordine
    this.order.name = this.fc.name.value 
    this.order.address = this.fc.address.value 
    this.order.userId = this.idUtente
    
    // richiamo la funzione create dell'order service per creare un ordine e salvarlo nel db
    this.orderService.create(this.order).subscribe({
      next: () => { // successo
        this.toastrService.success('Pagamento effettuato correttamente!')
        this.cartService.clearCart()
        this.router.navigateByUrl('/')
      },
      error: (erroResponse) => { // errore
        this.toastrService.error(erroResponse.error, 'Pagamento non andato a buon fine')
      }
    })
  }
}
