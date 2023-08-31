import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
// pagina del carrello
export class CartPageComponent implements OnInit{
  
  cart!: Cart;
  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart; // memorizzo il carrello attuale
    })
  }
  ngOnInit(): void {}

  // funzione per rimuovere un elemento dal carrello
  removeFromCart(cartItem: CartItem){
     this.cartService.removeFromCart(cartItem.book.id)
  }

  // funzione per cambiare la quantità di elementi nel carrello
  changeQuantity(cartItem: CartItem, quantityInString: string){
    // richiama il cart service passandogli la nuova quantità
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.book.id, quantity) 
  }
}
