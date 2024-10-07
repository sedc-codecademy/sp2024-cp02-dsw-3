
import {  SortDirection } from "./sortBy.enum";

export interface SearchImagesQuery{
    searchTerm?: string,
    pageNumber?: number,
    category?:string ,
    sortDirection?: SortDirection,
    inStock?:boolean
}
