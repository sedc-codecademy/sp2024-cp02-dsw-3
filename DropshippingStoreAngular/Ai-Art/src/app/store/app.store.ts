<<<<<<< HEAD
import { computed } from "@angular/core";
=======
import { SafeUrl } from "@angular/platform-browser";
>>>>>>> 5632aadb058bc2b09db74eefc1b0c14d913ffbdb
import { Artist } from "../types/artist.interface";
import { Category } from "../types/category.enum";
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
    sortBy: SortBy| undefined, //category, artist, stock, date
    sortDirection: SortDirection ,
    artistNames: string[],
    favorites: Image[],
    stringifyCreationImage: string,
    selectedCategory: string | undefined;
    selectedArtist: string | undefined;
<<<<<<< HEAD
    createdImage: string,
=======
    handleExpansion: boolean,
    isAuth: boolean,
    createdImage: SafeUrl | null,
>>>>>>> 5632aadb058bc2b09db74eefc1b0c14d913ffbdb
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
    sortBy: undefined,
    sortDirection: SortDirection.ASC,
    artistNames: [],
    favorites: [],
    selectedArtist:undefined,
    selectedCategory:undefined,
<<<<<<< HEAD
    createdImage: '',
    prompt: '',
    user: undefined,
    inStock: true
=======
    handleExpansion: false,
    isAuth: false,
    createdImage: null,
    stringifyCreationImage: '',
    prompt: '',
    user: undefined,
>>>>>>> 5632aadb058bc2b09db74eefc1b0c14d913ffbdb
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
        setArtists: (artistNames: string[])=>{patchState(state,{artistNames})},
        setSortBy: (sortBy: SortBy | undefined)=>{patchState(state,{sortBy})},
        setSortDirection: (sortDirection: SortDirection)=>{patchState(state, {sortDirection})},
        setInStock:(inStock: boolean | undefined)=>{patchState(state, {inStock})},
        setSelectedCategory: (selectedCategory: string | undefined)=>{patchState(state, {selectedCategory})},
        setSelectedArtist: (selectedArtist: string | undefined)=>{patchState(state, {selectedArtist})},
<<<<<<< HEAD
        resetSearchQueryParams: ()=>{
=======
        setCreatedImage: (createdImage:SafeUrl | null)=>{patchState(state, {createdImage})},
        setStringifyCreationImage: (stringifyCreationImage: string )=>{patchState(state, {stringifyCreationImage})},
        setPrompt: (prompt:string)=>{patchState(state, {prompt})},
        reset: ()=>{
>>>>>>> 5632aadb058bc2b09db74eefc1b0c14d913ffbdb
            patchState(state,{
                pageNumber: 1,
                totalCount: 0,
                pageSize: 12,
                searchTerm: '',
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
                searchParams.category = state.selectedCategory()
            }
            // if(state.sortDirection()){
            //     searchParams.sortDirection = state.sortDirection()
            // }

            return searchParams
        })
    })),
    withHooks({
        onInit:(state)=> {
            state.resetSearchQueryParams()
        },
    })
)
