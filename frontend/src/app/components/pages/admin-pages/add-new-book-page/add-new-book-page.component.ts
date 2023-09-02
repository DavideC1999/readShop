import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { IBook } from 'src/app/shared/interfaces/IBook';

export const ADD = 1
export const EDIT = 2


@Component({
  selector: 'app-add-new-book-page',
  templateUrl: './add-new-book-page.component.html',
  styleUrls: ['./add-new-book-page.component.css']
})
// pagina navigabile dall'admin per aggiungere un nuovo libro
export class AddNewBookPageComponent implements OnInit{

  @Input()
  action: number = ADD

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    // inizializzazione del form con validatori
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      ISBN: ['', Validators.required],
      releaseYear: ['', Validators.required],
      favorite: [''],
      imageUrl: ['', Validators.required],
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    // controlli sulla form
    this.isSubmitted = true;
    if(this.registerForm.invalid) {
      return;
    }
    const fv = this.registerForm.value;

    // salvo i dati inseriti dall'utente nel form
    const book: IBook = {
      id: '',
      name: fv.name,
      price: fv.price,
      author: fv.author,
      genre: fv.genre,
      description: fv.description,
      ISBN: fv.ISBN,
      releaseYear: fv.releaseYear,
      favorite: fv.favorite,
      imageUrl: fv.imageUrl
    };
    this.bookService.addNewBook(book) // richiama il book service
    this.router.navigateByUrl("/") // indirizzo l'utente alla home page
  }


}
