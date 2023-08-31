import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
// componente per il caricamento dei contenuti.
// funge solo da modificatore di stile, il vero e proprio loading viene 
// caricato tramite il suo interceptor
export class LoadingComponent {
  isLoading!: boolean
  constructor(loadingService: LoadingService){
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading
    })
    //loadingService.showLoading() //per testarlo
  }
}
