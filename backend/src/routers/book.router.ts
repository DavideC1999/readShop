import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Book, BookModel } from "../models/book.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/", asyncHandler( async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i')
    const books = await BookModel.find({name: {$regex: searchRegex}})
    res.send(books);
}))

router.get("/search/:searchTerm", asyncHandler( async(req, res) =>{
    const searchTerm = req.params.searchTerm
    try {
        const books = await BookModel.find({ name: { $regex: new RegExp(searchTerm, "i") } });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
}))

router.get("/:bookId", asyncHandler(
    async (req,res) => {
        const book = await BookModel.findById(req.params.bookId)
         res.send(book)
    }
))

router.post("/addNewBook", asyncHandler(async (req, res) => {
    const {name, price, author, genre, description, ISBN, releaseYear, imageUrl} = req.body
    const book = await BookModel.findOne({ISBN})

    if(book){
        res.status(HTTP_BAD_REQUEST).send('Il libro già esiste nel database!')
        return
    }
    const newBook:Book = {
        name: name,
        price: price,
        author: author,
        genre: genre,
        description: description,
        ISBN: ISBN,
        releaseYear: releaseYear,
        imageUrl: imageUrl,
        favorite: false
    }

    
    const dbBook = await BookModel.create(newBook)
    if (dbBook) {
        res.send(dbBook)
    } else {
        res.status(HTTP_BAD_REQUEST).send('Libro non aggiunto, riprova')
    }
    
}))

export default router;