import { Component, effect, inject } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '../types/image.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { NotificationService } from '../services/notification.service';
import { AppStore } from '../store/app.store';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule,MatGridListModule,MatIconModule, RouterLink,MatTooltipModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  appStore = inject(AppStore)

constructor(private readonly notificationService: NotificationService){
  effect(()=>{},{allowSignalWrites:true})
}


handleAddToCart(img: Image){
  this.appStore.setCart(img)
  this.appStore.removeFromFavorites(img)
  this.notificationService.handleSnackBar('Item is added in cart!')
}

handleRemoveFromFavorites(img: Image){
  this.appStore.removeFromFavorites(img)
  this.notificationService.handleSnackBar('Item is removed from favorites!')
}
}
