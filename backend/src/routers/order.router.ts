import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import auth from '../middlewares/auth.mid'

const router = Router()
router.use(auth) // azioni eseguibili solo se l'utente è autenticato

// enpoint per la creazione di un ordine. Quando l'utente effettua il pagamento
router.post('/create', asyncHandler( async (req:any, res:any) => {
    const requestOrder = req.body

    if(requestOrder.items.length <= 0){ // l'ordine deve essere creato solo se ci sono elementi nel carrello
        res.status(HTTP_BAD_REQUEST).send('Il carrello è vuoto!')
        return;
    }

    const newOrder = new OrderModel({...requestOrder}) // nuova struttura di tipo orderModel
    await newOrder.save() // crea l'ordine nel db
    res.send(newOrder)
}))

// endpoint per ottenere tutti gli ordini del singolo utente
router.post('/', asyncHandler( async (req:any, res: any) => {
    // ottiene l'ordine dall'id dell'utente che lo ha effettuato
    const {userId} = req.body

    const orders = await OrderModel.find({userId}) // cerca gli ordini per quell'utente nel db

    if (orders) {
        res.send(orders);
    } else {
        res.send("Nessun ordine");
    }

}))

// endpoint per ottenere tutti gli ordini nel db. Solo per admin
router.get('/adminGetAllOrders', asyncHandler( async (req:any, res: any) => {
    const orders = await OrderModel.find() // ottengo tutti gli ordini nel db

    if (orders) {
        res.send(orders);
    } else {
        res.send("Nessun Ordine");
    }
}))

// endpoint per la cancellazione di un ordine
router.post('/deleteOrder', asyncHandler(async(req:any, res:any) => {

    const {id} = req.body // id dell'ordine da cancellare richiesto

    const result = await OrderModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
        res.send("Ordine eliminato con successo");
    } else {
        res.send("Ordine non trovato");
    }

}))

export default router;




