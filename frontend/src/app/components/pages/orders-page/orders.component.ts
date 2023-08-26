import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  items: CartItem[] = [];

  constructor(private orderService: OrderService,private router:Router, activatedRoute: ActivatedRoute,private userService: UserService) {
    let orderObservable: Observable<Order[]>;
    activatedRoute.params.subscribe((params) => {

        orderObservable = orderService.getAllOrders(userService)

        orderObservable.subscribe((serverOrders) =>{
          this.orders = serverOrders
        })
    })
  }

  ngOnInit(): void {}

  deleteOrder(id: number){
    this.orderService.deleteOrder(id.toString())
    this.orderService.getAllOrders(this.userService).subscribe(orders => {
      this.orders = orders;
    });
    this.router.navigateByUrl("/orders")
  }

}
