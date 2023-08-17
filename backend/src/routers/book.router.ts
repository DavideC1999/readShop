import { Router } from "express";
import { sample_books, sample_users } from "../data";
import asyncHandler from "express-async-handler";
import { BookModel } from "../models/book.model";

const router = Router();

router.get("/seed", asyncHandler( async (req, res) => { // la connessione tra il database e il nostro codice è asincrona
 const booksCount = await BookModel.countDocuments();
    if(booksCount > 0){
        res.send("Seed is already done!");
        return;
    }

    await BookModel.create(sample_books);
    res.send("Seed is Done!");
}))

router.get("/", asyncHandler( async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i')
    const books = await BookModel.find({name: {$regex: searchRegex}})
    res.send(books);
}))

router.get("/search/:searchTerm", (req, res) =>{
    const searchTerm = req.params.searchTerm
    const books = sample_books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(books);
})

router.get("/:bookId", asyncHandler(
    async (req,res) => {
        const book = await BookModel.findById(req.params.bookId)
         res.send(book)
    }
))

export default router;