import { Schema, model } from 'mongoose';
import { Book, bookSchema } from './book.model';

export interface OrderItem{
    book: Book;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        book:{type: bookSchema, required: true},
        price:{ type: Number, required:true},
        quantity: {type: Number, required: true}
    }
);

export interface Order{
    id: string
    items: OrderItem[]
    totalPrice: number
    name: string
    address: string
    createdAt: Date
    updatedAt: Date
}

const OrderSchema = new Schema<Order>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    items: {type: [OrderItemSchema], required: true},
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const OrderModel = model<Order>('order', OrderSchema);