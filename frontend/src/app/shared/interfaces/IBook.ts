export interface IBook{
    id: string;
    name: string;
    author: string;
    price: number;    
    genre: string[];
    description: string;
    ISBN: string;
    releaseYear: string;
    favorite: boolean;
    imageUrl: string;
}
