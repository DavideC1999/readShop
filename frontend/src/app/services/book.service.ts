import { Injectable } from '@angular/core';
import { Book } from '../shared/models/book';
import { sample_books } from '../data';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getAll():Book[]{
    return sample_books;
  }
}
