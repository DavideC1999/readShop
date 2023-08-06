import { Router } from "express";
import { sample_books } from "../data";

const router = Router();

router.get("/", (req, res) => {
    res.send(sample_books);
})

router.get("/search/:searchTerm", (req, res) =>{
    const searchTerm = req.params.searchTerm
    const books = sample_books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(books);
})

router.get("/:bookId", (req,res) => {
    const bookId = req.params.bookId
    const books = sample_books.find(book => book.id == bookId)
    res.send(books)
})

export default router;