import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Image } from '../types/image.interface';
import { environment } from '../../environment';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _cart = new BehaviorSubject<Image[]>([])
  $cart = this._cart.asObservable()
  private _favorites = new BehaviorSubject<Image[]>([])
  $favorites = this._favorites.asObservable()
  imagesUrl = environment.gitJSON
 
  constructor(private readonly httpClient: HttpClient){ }
  

  getImages(){
    return this.httpClient.get<Image[]>(this.imagesUrl).pipe(
      catchError((error)=>{
        console.log(error)
        return of([{} as Image])
      })     
    ) 
    
  }

  getImage(id:string){
    const product = this.getImages().pipe(
      map((v)=>{ let item = v.filter(item=> item.id === id); return item[0]}),
      catchError((error)=>{
        console.log(error)
        return of({} as Image)
      })
    )
    return product
  }
  

}
