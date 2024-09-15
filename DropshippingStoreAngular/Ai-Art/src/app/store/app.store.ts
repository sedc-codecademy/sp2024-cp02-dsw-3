import { Artist } from "../types/artist.interface";
import { Category } from "../types/category.enum";
import { Image } from "../types/image.interface";
import { SortDirection } from "../types/sortDirection.enum";

export interface AppStore{
    products: Image[],
    searchTerm: string,// category, description
    page: number,
    pageSize: number,
    total: number,
    isLoading: boolean,
    sortBy: string, //category, artist, stock, date
    sortDirection: SortDirection ,
    artistNames: string[],
    category: Category | undefined,
    favorites: Image[],
    handleExpansion: boolean,
    isAuth: boolean,
    createdImage: string,
    prompt: string,
    user: Artist | undefined,
}
