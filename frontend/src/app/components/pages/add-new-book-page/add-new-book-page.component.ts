import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { IBook } from 'src/app/shared/interfaces/IBook';

@Component({
  selector: 'app-add-new-book-page',
  templateUrl: './add-new-book-page.component.html',
  styleUrls: ['./add-new-book-page.component.css']
})
export class AddNewBookPageComponent implements OnInit{

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
    this.bookService.addNewBook(book)
    this.router.navigateByUrl("/")
  }


}
