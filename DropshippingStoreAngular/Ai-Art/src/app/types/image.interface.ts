import { Artist } from "./artist.interface";
import { Category } from "./category.enum";

export interface Image{
    id: string,
    description: string,
    category: Category,
    artist: Artist,
    price: number,
    stock: boolean,
    imageUrl: string

}
