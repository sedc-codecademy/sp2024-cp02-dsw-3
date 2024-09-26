import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../types/image.interface';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = new BehaviorSubject<Image[]>([])
  $cart = this._cart.asObservable()
  constructor(private readonly notificationService: NotificationService) { }

  addInCart(image:Image){
    const cart = this._cart.getValue()
    console.log('iam here')
    if(cart.find(i=>i.id==image.id)){
      return
    }
    this._cart.next([...cart, image])
    this.notificationService.handleSnackBar('Item is successfully added in cart!')
  }


  removeCart(imageID: string){
    const cart = this._cart.getValue().filter((i)=>i.id !== imageID)
    this._cart.next([...cart])
    this.notificationService.handleSnackBar('Item is successfully removed from cart!')
  }

  cartLength(){
    return this._cart.getValue().length
  }
}
