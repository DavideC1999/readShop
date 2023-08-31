import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// messaggi di validazione restituiti nei form
const VALIDATORS_MESSAGES:any = {
  required:'Non deve essere vuoto',
  email:'Email non valida',
  minlength: 'Campo troppo corto',
  notMatch: 'Password e Confirm non corrispondono',
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl
  @Input()
  showErrorsWhen:boolean = true

  errorMessages:string[] = [] // per memorizzare i messaggi di errore

  constructor(){}

  ngOnChanges(): void {
    // avvia il controllo quando c'è un cambiamento
    this.checkValidation()
  }

  ngOnInit(): void {
    // // avvia il controllo quando appena viene caricata la pagina
    this.control.statusChanges.subscribe(() => {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }

  checkValidation(){
    const errors = this.control.errors // prendo tutti gli errori nel form 
    if(!errors){ // se non ci sono errori l'array deve essere vuoto
      this.errorMessages = []
      return
    }

    const errorKeys = Object.keys(errors) // restituisce le chiavi come stringhe
    // inserisco tutti gli errori dentro all'array errorMessages
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
