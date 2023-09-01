import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Book, BookModel } from "../models/book.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

// endpoint per ottenere la lista di tutti i libri presenti nel db
router.get("/", asyncHandler( async (req, res) => { // la comunicazione asincrona viene utilizzata nelle comunicazioni con il db
    const searchRegex = new RegExp(req.params.searchTerm, 'i') // espressione regolare case insensitive
    
    try {
        const books = await BookModel.find({name: {$regex: searchRegex}}) // cerca il libro nel db
        res.send(books); // restituisce il libro trovato
    } catch (error) {
        res.status(500).send(error); // ritorna l'errore
    }
}))

// endpoint per ottenere tutti i libri nel db. Solo per admin
router.get('/adminGetAllBooks', asyncHandler( async (req:any, res: any) => {
    const books = await BookModel.find() // ottengo tutti i libri nel db

    if (books) {
        res.send(books);
    } else {
        res.send("Nessun Libro");
    }
}))


router.post("/adminDeleteBook", asyncHandler( async (req, res) => {   
    const {id} = req.body
  
    const book = await BookModel.deleteOne({ _id: id })
  
    if (book) {
        res.send("Libro eliminato con successo");
    } else {
        res.send("Nessun Libro");
    }
  }))
  

// endopoint utilizzato per la Search. Il parametro viene passato sull'url
router.get("/search/:searchTerm", asyncHandler( async(req, res) =>{
    const searchTerm = req.params.searchTerm
    try {
        const books = await BookModel.find({ name: { $regex: new RegExp(searchTerm, "i") } });
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
}))

// endpoint per la ricerca di un libro by id
router.get("/:bookId", asyncHandler(async (req,res) => {
    try {
        const book = await BookModel.findById(req.params.bookId)
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
}))

// endpoint POST per aggiungere un nuovo libro al db. Solo se utente admin
router.post("/addNewBook", asyncHandler(async (req, res) => {
    const {name, price, author, genre, description, ISBN, releaseYear, imageUrl} = req.body
    const book = await BookModel.findOne({ISBN}) // l'ISBM è univoco

    if(book){
        res.status(HTTP_BAD_REQUEST).send('Il libro è già esiste nel database!')
        return
    }
    const newBook:Book = { // creo una nuova struttura Book con i dati arrivati
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
    
    const dbBook = await BookModel.create(newBook) // aggiunge il libro al db
    if (dbBook) {
        res.send(dbBook)
    } else {
        res.status(HTTP_BAD_REQUEST).send('Libro non aggiunto, riprova')
    }
    
}))

export default router;