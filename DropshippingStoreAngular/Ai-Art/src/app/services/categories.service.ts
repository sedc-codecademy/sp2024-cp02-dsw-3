import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Image } from '../types/image.interface';
import { environment } from '../../environment';
import { SearchImagesQuery } from '../types/searchImagesQuery.interface';
import { ResponseApiCategories } from '../types/responseCategories.interface';
import { ResponseAPIArtist } from '../types/getArtist.interface';
import { ImageSafeUrl } from '../types/image.safeUrl';
import { DomSanitizer } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _cart = new BehaviorSubject<Image[]>([])
  $cart = this._cart.asObservable()
  private _favorites = new BehaviorSubject<Image[]>([])
  $favorites = this._favorites.asObservable()
  private imagesPath = environment.API_IMAGES
 
  constructor(private readonly httpClient: HttpClient, private sanitizer:DomSanitizer){ }
  

  getImages(searchQuery: SearchImagesQuery = {}):Observable<ResponseApiCategories>{
    return this.httpClient.get<ResponseApiCategories>(`${this.imagesPath}GetImages`,{params: {...searchQuery}}).pipe(
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
    console.log('id in getImage',id)
    return this.httpClient.get<{image: Image}>(`${this.imagesPath}GetById${id}`)
  }
  getArtist(){
    return this.httpClient.get<{users: ResponseAPIArtist[]}>(`${this.imagesPath}users`)
  }
  handleProductCategory(item: ImageSafeUrl){
    let category
    switch (item.category) {
      case 0:
        category = 'Portraits'
        break;
      case 1:
        category = 'Acrylic'
        break;
      case 2:
        category = 'Black and white'
      break;
      case 4:
        category = 'Canvas'
      break;
      case 5:
        category = 'Landscapes'
      break;
      case 6:
        category = 'Charcoal,chalk and pastel'
      break;
      case 7:
        category = 'Art and design'
      break;
      case 8:
        category = 'Abstract'
      break;
      case 9:
        category = 'Astro photography'
      break;
      default:
        break;
      
    }
    return category
    
  }
  mapProduct(product: Image){
    if(product.imageUrl.charAt(0)=='d'){
      let item :ImageSafeUrl = {
        id: product.id,
          description: product.description,
          createdAt: product.createdAt,
          category: product.category,
          userId:product.userId,
          price: product.price,
          stock: product.stock,
          boughtByUserId: product.boughtByUserId,
          soldByUserId:product.soldByUserId,
          imageUrl: this.sanitizer.bypassSecurityTrustUrl(product.imageUrl)
      }
      return item
    }else{
      return product as ImageSafeUrl
    }

  }
  mapperSafeUrl(data: Image[]){
    let items: ImageSafeUrl[] = []
    for(let item of data){
      if (item.imageUrl.charAt(0)=='d'){
        
        let test: ImageSafeUrl = {
          id: item.id,
          description: item.description,
          createdAt: item.createdAt,
          category: item.category,
          userId:item.userId,
          price: item.price,
          stock: item.stock,
          boughtByUserId: item.boughtByUserId,
          soldByUserId:item.soldByUserId,
          imageUrl: this.sanitizer.bypassSecurityTrustUrl(item.imageUrl)
        }
        items.push(test)
      }else{
        items.push(item)
      }
    }
    console.log('items safe Url in service',items)
    return items
  }
}
