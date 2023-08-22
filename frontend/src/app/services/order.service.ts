import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_GET_ALL_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  create(order: Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order)
  }

  getAllOrders(data: UserService){
    const currentUser = data.currentUser;

    const requestData = {
      name: currentUser.name,
      address: currentUser.address,
    };
    
    return this.http.post<Order[]>(ORDER_GET_ALL_URL, requestData);
  }
  
}
