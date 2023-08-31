import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
// componente per mostrare una scritta di errore e un bottone per tornare alla home page
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false
  @Input()
  notFoundMessage = "Nothing Found!"
  @Input()
  resetLinkText = "Reset"
  @Input()
  resetLinkRoute = "/"

  constructor(){}
  ngOnInit(): void {}
}
