import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
// componente per la ricerca dei libri nella home page
export class SearchComponent implements OnInit {
  
  searchTerm = ''
  
  constructor(activatedRoute: ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm; // vengono salvati le info della ricerca
    })
  }

  ngOnInit(): void {}

  // l'utente inserisce un termine di ricerca (term) all'interno della search bar
  // e viene indirizzato all'url composto da /search/ + term.
  // All'interno della home del sito (sul costruttore) è presente un controllo
  // che richiama la funzione del BookService (getAllBooksBySearchTerm()) se sull'url c'è un term. 
  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/search/' + term)
      // l'utente viene indirizzato con url il search term
    }else{
      this.router.navigateByUrl('/')
      // se l'utente fa una ricerca senza elementi viene restituita la home page con tutti i libri
    }
  }
}
