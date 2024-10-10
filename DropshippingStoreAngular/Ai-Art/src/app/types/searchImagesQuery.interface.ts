export interface SearchImagesQuery{
    searchTerm?: string,
    pageNumber?: number,
    category?:number ,
    sortByPriceAsc?: boolean,
    inStock?:boolean,
    username?:string
}
