import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// service utilizzato per ottenere la pagine nella dashboard dell'admin. la pagina viene salvata nelle local storage
export class PageService {
  page: number = 1

  constructor(){}

  getPage():number {
    return this.getPageToLocalstorage()
  }

  setPage(page: number): void {
    this.setPageToLocalstorage( page)
  }

  private setPageToLocalstorage(page: number){
    localStorage.setItem('PAGE', JSON.stringify(page))
  }

  private getPageToLocalstorage():number{
    const pageJSON = localStorage.getItem('PAGE')
    if(pageJSON) return JSON.parse(pageJSON) 
    return 1
  }

}
