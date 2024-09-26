import { Artist } from "../types/artist.interface";
import { Category } from "../types/category.enum";
import { Image } from "../types/image.interface";
import { SortBy, SortDirection } from "../types/sortBy.enum";
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals'

export interface AppStates{
    products: Image[],
    searchTerm: string,// category, description
    page: number,
    pageSize: number,
    total: number,
    isLoading: boolean,
    sortBy: SortBy| undefined, //category, artist, stock, date
    sortDirection: SortDirection ,
    artistNames: string[],
    category: Category | undefined,
    favorites: Image[],
    selectedCategory: string | undefined;
    selectedArtist: string | undefined;
    handleExpansion: boolean,
    isAuth: boolean,
    createdImage: string,
    prompt: string,
    user: Artist | undefined,
}


const defaultState: AppStates = {
    products: [],
    searchTerm: '',
    page: 0,
    pageSize: 12,
    total: 0,
    isLoading: false,
    sortBy: undefined,
    sortDirection: SortDirection.ASC,
    artistNames: [],
    category: undefined,
    favorites: [],
    selectedArtist:undefined,
    selectedCategory:undefined,
    handleExpansion: false,
    isAuth: false,
    createdImage: '',
    prompt: '',
    user: undefined
}

export const AppStore = signalStore(
    {providedIn: 'root'},
    withState(defaultState),
    withMethods((state)=>({
        setProducts: (products: Image[])=>{patchState(state, {products})},
        setSearch: (searchTerm: string)=>{patchState(state, {searchTerm, page:0})},
        setPage: (page: number)=>{patchState(state,{page})},
        setPageSize: (pageSize: number)=>{patchState(state, {pageSize})},
        setTotal: (total:number)=>{patchState(state, {total})},
        setIsLoading: (isLoading:boolean)=>{patchState(state, {isLoading})},
        setCategories: (category: Category)=>{patchState(state, {category})}, //moze nema da treba
        setArtists: (artistNames: string[])=>{patchState(state,{artistNames})},
        setSortBy: (sortBy: SortBy | undefined)=>{patchState(state,{sortBy})},
        setSortDirection: (sortDirection: SortDirection)=>{patchState(state, {sortDirection})},
        setSelectedCategory: (selectedCategory: string | undefined)=>{patchState(state, {selectedCategory})},
        setSelectedArtist: (selectedArtist: string | undefined)=>{patchState(state, {selectedArtist})},
        reset: ()=>{
            patchState(state,{
                page: 0,
                pageSize: 12,
                searchTerm: '',
                sortBy: undefined,
                sortDirection: SortDirection.ASC,
                selectedArtist: undefined,
                selectedCategory: undefined

            })
        }
    })),
    withHooks({
        onInit:(state)=> {
            state.reset()
        },
    })
)
