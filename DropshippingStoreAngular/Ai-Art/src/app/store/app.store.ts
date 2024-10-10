import { computed } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Artist } from "../types/artist.interface";
import { Image } from "../types/image.interface";
import { SortBy, SortDirection } from "../types/sortBy.enum";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals'
import { SearchImagesQuery } from "../types/searchImagesQuery.interface";

export interface AppStates{
    products: Image[],
    searchTerm: string,// category, description
    pageNumber: number,
    totalPages: number,
    pageSize: number,
    totalCount: number,
    isLoading: boolean,
    sortByPriceAsc: boolean , //default ASC
    artistNames: string[],
    favorites: Image[],
    cart: Image[]
    stringifyCreationImage: string,
    selectedCategory: string | undefined;
    selectedArtist: string | undefined;
    createdImage: SafeUrl,
    handleExpansion: boolean,
    isAuth: boolean,
    prompt: string,
    user: Artist | undefined,
    inStock: boolean | undefined
}


const defaultState: AppStates = {
    products: [],
    searchTerm: '',
    pageNumber: 1,
    totalPages: 0,
    pageSize: 12,
    totalCount: 0,
    isLoading: false,
    sortByPriceAsc: true,
    artistNames: [],
    favorites: [],
    cart: [],
    selectedArtist:undefined,
    selectedCategory:undefined,
    prompt: '',
    user: undefined,
    inStock: true,
    handleExpansion: false,
    isAuth: false,
    createdImage: '',
    stringifyCreationImage: '',
}

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(defaultState),
    withMethods((state)=>({
        setProducts: (products: Image[])=>{patchState(state, {products})},
        setSearch: (searchTerm: string)=>{patchState(state, {searchTerm, pageNumber:0})},
        setPage: (pageNumber: number)=>{patchState(state,{pageNumber})},
        setTotalPages:(totalPages:number)=>{patchState(state, {totalPages})},
        setPageSize: (pageSize: number)=>{patchState(state, {pageSize})},
        setTotal: (totalCount:number)=>{patchState(state, {totalCount})},
        setIsLoading: (isLoading:boolean)=>{patchState(state, {isLoading})},
        setSortByPriceAsc: (sortByPriceAsc: boolean)=>{patchState(state, {sortByPriceAsc})},
        setArtists: (artistNames: string[])=>{patchState(state,{artistNames})},
        setFavorites: (image: Image)=>{ 
                patchState(state,{favorites: [...state.favorites(), image]})            
        },
        removeFromFavorites:(images:Image[])=>{
            patchState(state, {favorites:images})
        },
        resetFavorites: ()=>{
            let fave:Image[] = []
            patchState(state, {favorites:fave})
        },
        setCart: (image: Image)=>{ 
                patchState(state,{cart: [...state.cart(), image]})
        },
        removeFromCart:(image:Image[])=>{
            patchState(state, {cart:image})
        },
        resetCart: ()=>{
            let fave:Image[] = []
            patchState(state, {cart:fave})
        },
        setInStock:(inStock: boolean | undefined)=>{patchState(state, {inStock})},
        setIsAuth: (isAuth: boolean)=>{patchState(state, {isAuth})},
        setSelectedCategory: (selectedCategory: string | undefined)=>{patchState(state, {selectedCategory})},
        setSelectedArtist: (selectedArtist: string | undefined)=>{patchState(state, {selectedArtist})},
        setCreatedImage: (createdImage:SafeUrl)=>{patchState(state, {createdImage})},
        setStringifyCreationImage: (stringifyCreationImage: string )=>{patchState(state, {stringifyCreationImage})},
        setPrompt: (prompt:string)=>{patchState(state, {prompt})},
        resetQueryParams: ()=>{
            patchState(state,{
                pageNumber: 1,
                totalCount: 0,
                pageSize: 12,
                searchTerm: '',
                sortByPriceAsc: undefined,
                selectedCategory: undefined,
                inStock: true,
                totalPages:0

            })
        }
    })),
    withComputed((state)=>({
        searchParams: computed(()=>{
            const searchParams: SearchImagesQuery = {
                pageNumber: state.pageNumber(),
            }
            if(state.searchTerm()){
                searchParams.searchTerm = state.searchTerm()
            }
            if(state.inStock()){
                searchParams.inStock = state.inStock()
            }
            if(state.selectedCategory()){
                searchParams.category = Number(state.selectedCategory())
            }
            if(state.sortByPriceAsc()){
                searchParams.sortByPriceAsc = state.sortByPriceAsc()
            }if(state.selectedArtist()){
                searchParams.username = state.selectedArtist()
            }

            return searchParams
        })
    })),
    withHooks({
        onInit:(state)=> {
            state.resetQueryParams()
        },
    })
)
