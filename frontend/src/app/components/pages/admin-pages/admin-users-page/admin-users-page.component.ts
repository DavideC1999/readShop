import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {
  
  users: User[] = [];

  constructor(private adminService: AdminService, activatedRoute: ActivatedRoute){
    let usersObservable: Observable<User[]>;
    activatedRoute.params.subscribe((params) => {
        // richiedo gli ordini per l'utente attivo
        usersObservable = adminService.adminGetAllUsers() 
        // salvo gli ordini per mostrarli nella pagina
        usersObservable.subscribe((serverUsers) =>{
          this.users = serverUsers
        })
    })
  }

  ngOnInit(): void {}

  // cancellazione dell'utente
  deleteUser(id: string){
    this.adminService.adminDeleteUser(id)

    // richiedo la lista aggiornata degli utenti
    this.adminService.adminGetAllUsers().subscribe(users => {
      this.users = users;
      // La pagina potrebbe non aggiornarsi correttamente. per questo motivo la ricarico
      window.location.reload()
    });
  }
}
