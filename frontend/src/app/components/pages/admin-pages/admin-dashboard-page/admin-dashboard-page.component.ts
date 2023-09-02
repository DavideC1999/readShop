import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

export const ORDERS = 1
export const USERS = 2
export const BOOKS = 3
export const ADD_NEW_BOOK = 4

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})

export class AdminDashboardPageComponent implements OnInit {

  contentPage:number
  
  ORDERS: number = ORDERS;
  USERS: number = USERS;
  BOOKS: number = BOOKS;
  ADD_NEW_BOOK: number = ADD_NEW_BOOK;

  constructor(private adminService: AdminService){
    this.contentPage = adminService.getPage()
  }

  ngOnInit(): void {}

  // alla chiusura della pagine imposta, tramite la local storage, la pagina degli ordini
  // ogni volta che si apre la dashboard si parte da quella pagina
  ngOnDestroy(){
    this.adminService.setPage(ORDERS);
  }

  // cambio pagina. La pagina viene settata sulla local storage
  submit(page: number){
    this.adminService.setPage(page);
    this.contentPage = page;
  }
}
