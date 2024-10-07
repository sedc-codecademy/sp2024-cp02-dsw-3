import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Image } from '../types/image.interface';
import { environment } from '../../environment';
import { SearchImagesQuery } from '../types/searchImagesQuery.interface';
import { ResponseApiCategories } from '../types/responseCategories.interface';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _cart = new BehaviorSubject<Image[]>([])
  $cart = this._cart.asObservable()
  private _favorites = new BehaviorSubject<Image[]>([])
  $favorites = this._favorites.asObservable()
  private imagesPath = environment.API_IMAGES
 
  constructor(private readonly httpClient: HttpClient){ }
  

  getImages(searchQuery: SearchImagesQuery = {}):Observable<ResponseApiCategories>{
    return this.httpClient.get<ResponseApiCategories>(`${this.imagesPath}/GetImages`,{params: {...searchQuery}}).pipe(
      catchError((error)=>{
        console.log(error)
        return of({paginatedImages: {
          data: [],
          totalCount: 0,
          pageNumber: 0,
          pageSize: 0,
          totalPages: 0
        }})
      })  
    ) 
    
  }

  getImage(id:string){
    return this.httpClient.get(`${this.imagesPath}/GetById/${id}`)
  }
  

}
