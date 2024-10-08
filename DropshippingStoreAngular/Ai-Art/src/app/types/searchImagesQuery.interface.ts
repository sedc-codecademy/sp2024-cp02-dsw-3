
import {  SortDirection } from "./sortBy.enum";

export interface SearchImagesQuery{
    searchTerm?: string,
    pageNumber?: number,
    category?:number ,
    sortDirection?: SortDirection,
    inStock?:boolean
}
