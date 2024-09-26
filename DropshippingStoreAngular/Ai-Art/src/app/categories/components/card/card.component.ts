import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { CartService } from '../../../services/cart.service';
import { FavoritesService } from '../../../services/favorites.service';
import { Image } from '../../../types/image.interface';

@Component({
  selector: 'app-card2',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatIconModule,MatDividerModule, CurrencyPipe,RouterLink,MatChipsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
 image=input.required<Image>()
 constructor(private cartService: CartService, private favoritesService: FavoritesService){}
 handleAddToCart(item:Image){
  this.cartService.addInCart(item)
 }
 handleAddToFavorites(item:Image){
  this.favoritesService.addInFavorites(item)
 }

}
