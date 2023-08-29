import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../shared/models/Book';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Inizializza il carrello con i dati memorizzati localmente (localStorage)
  private cart:Cart = this.getCartFromLocalStorage();
  // BehaviorSubject per tenere traccia del carrello e notificare gli osservatori sui cambiamenti
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  // Metodo per aggiungere un libro al carrello
  addToCart(book: Book):void{
    // Verifica se il libro è già presente nel carrello
    let cartItem = this.cart.items.find(item => item.book.id === book.id)

    // se il libro è già presente, aggiungi +1 alla quantità sul carrello
    if(cartItem){
      cartItem.quantity = cartItem.quantity + 1 // aumenta di 1 la quantità di quel libro
      cartItem.price = cartItem.quantity * cartItem.book.price // ricalcola il prezzo totale 
      this.setCartToLocalStorage(); // Salva il carrello nella local storage
      return;
    }
    // se il libro non è presente, aggiungilo al carrello
    this.cart.items.push(new CartItem(book));
    this.setCartToLocalStorage(); // Salva il carrello nella local storage
  }

  // Metodo per rimuovere un libro dal carrello
  removeFromCart(bookId: string):void{
    // Filtra gli elementi del carrello per rimuovere il libro specificato
    this.cart.items = this.cart.items.filter(item => item.book.id != bookId)
    // Salva il carrello nell'archivio locale
    this.setCartToLocalStorage();
  }

  // Metodo per cambiare la quantità di un libro nel carrello
  changeQuantity(bookId: string, quantity: number){
    // Trova l'elemento del carrello corrispondente al libro
    let cartItem = this.cart.items.find(item => item.book.id === bookId)
    if(!cartItem)
      // Esci se il libro non è nel carrello
      return
    // Modifica la quantità e il prezzo dell'elemento del carrello
    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.book.price
    this.setCartToLocalStorage(); // Salva il carrello nell'archivio locale
  }

  // Metodo per svuotare completamente il carrello
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage(); // Salva il carrello vuoto nell'archivio locale
  }

  // Metodo per ottenere un Observable del carrello
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable()
  }

  // Metodo per ottenere il carrello attuale
  getCart(): Cart{
    return this.cartSubject.value
  }

  // Metodo privato per salvare il carrello nell'archivio locale
  private setCartToLocalStorage():void{
    // Calcola il prezzo totale e la quantità totale del carrello
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0)
    // reduce riduce gli elementi di un array in un singolo valore
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)

    // Tronca il prezzo totale a due cifre decimali
    this.cart.totalPrice = parseFloat(this.cart.totalPrice.toFixed(2)) // tronca a due cifre dopo la virgola

     // Converte il carrello in formato JSON e lo salva nell'archivio locale
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)
    // Notifica agli osservatori del carrello che è stato aggiornato
    this.cartSubject.next(this.cart)
  }

   // Metodo privato per ottenere il carrello dallo storage locale
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson? JSON.parse(cartJson): new Cart()
  } 

}
