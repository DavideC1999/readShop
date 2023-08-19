import {Schema, model} from 'mongoose';

export interface Order{
}

export const UserSchema = new Schema<Order>({

}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const OrderModel = model<Order>('order', UserSchema);