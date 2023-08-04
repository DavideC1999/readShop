import { Schema, model } from "mongoose";

export interface Book{
    id: string;
    name: string;
    price: number;
    author: string;
    genre: string[];
    description: string;
    ISBN: string;
    releaseYear: string;
    favorite: boolean;
    imageUrl: string;
}

export const bookSchema = new Schema<Book>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        author: {type: String, required: true},
        genre: {type: [String], required: true},
        description: {type: String, required: true},
        ISBN: {type: String, required: true},
        releaseYear: {type: String, required: true},
        favorite: {type: Boolean, required: true},
        imageUrl: {type: String, required: true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
)

export const BookModel = model<Book>('book', bookSchema);