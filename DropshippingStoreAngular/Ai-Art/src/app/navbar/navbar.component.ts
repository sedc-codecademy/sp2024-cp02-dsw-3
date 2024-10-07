import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    RouterModule,
    NgFor,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  favorites: number
  cart:number
  subscriptionFave = new Subscription()
  subscriptionCart = new Subscription()
  @ViewChild('drawer') drawer: MatSidenav | undefined;
  constructor(private readonly favoriteService: FavoritesService, private readonly cartService: CartService){}
  ngOnInit(){ 
    this.subscriptionFave = this.favoriteService.$favorites.subscribe(data=> this.favorites = data.length )
    this.subscriptionCart = this.cartService.$cart.subscribe(data=> this.cart = data.length)
  }
  
  
  closeSidenav(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }
}
