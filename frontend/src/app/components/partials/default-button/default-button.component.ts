import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
// componente per il default button del sito
export class DefaultButtonComponent {
  @Input()
  type: 'submit' | 'button' = 'submit'
  @Input()
  text:string = 'Submit'
  @Input()
  bgColor = '#6DD64C'
  @Input()
  color = 'white'
  @Input()
  fontSizeRem = 1.3
  @Input()
  widthRem = 12
  @Output()
  onClick = new EventEmitter()

  constructor(){}
}
