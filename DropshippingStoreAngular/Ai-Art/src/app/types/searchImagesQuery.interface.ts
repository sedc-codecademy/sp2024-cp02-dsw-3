import { Category } from "./category.enum";
import { SortBy, SortDirection } from "./sortBy.enum";

export interface SearchImagesQuery{
    searchTerm?: string,
    pageNumber?: number,
    category?:Category,
    sortDirection?: SortDirection,
    inStock?:boolean
}
