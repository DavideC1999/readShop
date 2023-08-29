import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
// title da aggiungere su ogni pagina
export class TitleComponent implements OnInit {
  
  constructor(){}
  // proprietà in input per il titolo (valori pre assegnati)

  @Input()
  title!: string;

  @Input()
  margin!: '1rem 0 1rem 0.2rem';

  @Input()
  fontSize!: '1.7rem'; 

  ngOnInit(): void {}
}
