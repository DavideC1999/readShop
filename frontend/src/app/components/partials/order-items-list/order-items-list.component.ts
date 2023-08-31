import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})

// componente per la sola visualizzazione degli ordini all'interno della pagina di checkout
export class OrderItemsListComponent {
  // prende in input gli elementi contenuti nell'ordine
  @Input()
  order!: Order
  
  constructor(){}
}
