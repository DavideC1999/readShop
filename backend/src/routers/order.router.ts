import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatusEnum } from "../constants/order_status";
import { OrderModel } from "../models/order.mode";
import auth from '../middlewares/auth.mid'

const router = Router()
//router.use(auth)

router.post('/create', asyncHandler( async (req:any, res:any) => {
    const requestOrder = req.body

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('Cart is empty!')
        return;
    }

    /*await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatusEnum.NEW
    })*/

    const newOrder = new OrderModel({...requestOrder})
    await newOrder.save()
    res.send(newOrder)
}))

router.post('/getAllOrders', asyncHandler( async (req:any, res: any) => {
    const {name, address} = req.body

    const orders = await OrderModel.find({ name: name, address: address })

    if (orders) {
        res.send(orders);
    } else {
        res.send("Nessun ordine");
    }

}))

router.post('/deleteOrder', asyncHandler(async(req:any, res:any) => {

    const {id} = req.body

    const result = await OrderModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
        res.send("Ordine eliminato con successo");
    } else {
        res.send("Ordine non trovato");
    }

}))

export default router;




