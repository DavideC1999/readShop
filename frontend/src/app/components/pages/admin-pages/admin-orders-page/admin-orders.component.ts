import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
// pagina di gestione degli ordini dell'utente
export class AdminOrdersComponent implements OnInit {

  orders: Order[] = [];
  items: CartItem[] = [];

  constructor(adminService: AdminService,private router:Router, activatedRoute: ActivatedRoute,private userService: UserService) {
    let orderObservable: Observable<Order[]>;
    activatedRoute.params.subscribe((params) => {
        // richiedo gli ordini per l'utente attivo
        orderObservable = adminService.adminGetAllOrders() 
        // salvo gli ordini per mostrarli nella pagina
        orderObservable.subscribe((serverOrders) =>{
          this.orders = serverOrders
        })
    })
  }

  ngOnInit(): void {}

}
