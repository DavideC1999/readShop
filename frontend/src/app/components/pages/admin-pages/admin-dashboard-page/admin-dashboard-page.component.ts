import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../services/page-service'

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
  
})

export class AdminDashboardPageComponent implements OnInit {

  contentPage:number

  constructor(private pageService: PageService){
    this.contentPage = pageService.getPage()
  }

  ngOnInit(): void {}

  ngOnDestroy(){
    this.pageService.setPage(1);
  }

  submit(page: number){
    this.pageService.setPage(page);
    this.contentPage = page;
  }
}
