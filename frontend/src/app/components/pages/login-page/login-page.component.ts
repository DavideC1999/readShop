import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
// pagina di login
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup
  isSubmitted = false
  returnUrl:string = '/';
  
  constructor(private formBuilder: FormBuilder, 
    private userService:UserService, 
    private activatedRoute:ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    // init del form con relativi validatori
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    if(this.activatedRoute.snapshot.queryParams.returnUrl == 'login'){
      this.returnUrl = this.returnUrl + this.activatedRoute.snapshot.queryParams.returnUrl;
    }
  }

  get fc(){
    return this.loginForm.controls
  }

  submit(){
    this.isSubmitted = true; // flag per mostrare l'errore (se true)
    if(this.loginForm.invalid) return
    
    // richiamo lo User service e indirizzo l'utente dove era prima
    this.userService.login({email:this.fc.email.value,password: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl)
    });
  }
}
