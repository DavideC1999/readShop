import { Book } from "./Book";

export class CartItem{
    constructor(public book:Book){}
    quantity: number = 1;
    price: number = this.book.price;
    name: string = this.book.name;
    ISBN: string = this.book.ISBN;
    image: string = this.book.imageUrl;
}