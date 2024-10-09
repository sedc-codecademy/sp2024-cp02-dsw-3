import { Artist } from "./artist.interface";


export interface Image{
    id: string,
    description: string,
    category: number,
    userId: string,
    price: number,
    stock: boolean,
    imageUrl: string 
    createdAt: Date,
    boughtByUserId: string | null,
    soldByUserId: string | null
}
