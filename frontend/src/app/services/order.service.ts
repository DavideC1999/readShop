import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_DELETE_URL, ORDER_GET_ALL_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  create(order: Order){
    const requ = this.http.post<Order>(ORDER_CREATE_URL, order)
    return requ
  }

  getAllOrders(data: UserService){
    const currentUser = data.currentUser;

    const requestData = {
      name: currentUser.name,
      address: currentUser.address,
    };
    
    return this.http.post<Order[]>(ORDER_GET_ALL_URL, requestData);
  }

  deleteOrder(id: string){
    const requestData = {
      id: id,
    };

    this.http.post(ORDER_DELETE_URL, requestData, { responseType: 'text' })
        .subscribe(response => {
            console.log(response);
        }, error => {
            console.error(error);
        });
    }
}
