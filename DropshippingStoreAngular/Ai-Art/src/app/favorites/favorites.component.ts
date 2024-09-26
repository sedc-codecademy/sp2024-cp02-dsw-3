import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '../types/image.interface';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule,MatIconModule, RouterLink,MatTooltipModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  gridClass = ['medium', 'large', 'small']
  num = Math.floor(Math.random() * this.gridClass.length);
  favorites: Image[]
  subscription = new Subscription()
constructor( private favoritesService: FavoritesService, private cartService: CartService){}
ngOnInit(){
  let fave = this.favoritesService.favoritesLength()
  console.log(fave)

  this.subscription = this.favoritesService.$favorites.subscribe(data=> this.favorites = data )
  console.log(this.favorites)
}


handleAddToCart(img: Image){
  this.cartService.addInCart(img)
  this.favoritesService.removeFromFavorites(img.id)
}

handleRemoveFromFavorites(img: Image){
  this.favoritesService.removeFromFavorites(img.id)
}
}
