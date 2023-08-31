import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
// pagina di registrazione
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false; // variabile utilizzata per i controlli sugli errori nel form
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // init del form con relativi validatori
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', Validators.required]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });
    
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  
  get fc() {
    // tramite l'attributo controls prendo l'errore, se presente, di quel campo
    // esempio: il campo nome deve essere obbligatorio se non lo è viene memorizzato 
    // in control l'errore 'required=true' per quel campo
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true; // se true mostra l'errore se presente. Viene inviata alla input validation
    if(this.registerForm.invalid) return;

    // salvo i dati inseriti nel form in un'interfaccia per inviarli al backend
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address,
      isAdmin: false
    };

    // mando i dati allo user service e indirizzo l'utente sulla pagin in cui era in precedenza
    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}