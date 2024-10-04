import { Category } from "./category.enum";

export interface Creation{
    category: Category,
    description: string,
    price: number,
    user: string,
    image: string 
}
