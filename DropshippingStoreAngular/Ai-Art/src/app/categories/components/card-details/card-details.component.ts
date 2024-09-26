import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { UniqueWorkComponent } from './components/unique-work/unique-work.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { Image } from '../../../types/image.interface';
import { CategoriesService } from '../../../services/categories.service';
import { CartService } from '../../../services/cart.service';
import { FavoritesService } from '../../../services/favorites.service';


@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [AsyncPipe,UniqueWorkComponent,CertificateComponent ,MatChipsModule,MatIconModule,CurrencyPipe, MatButtonModule, RouterLink, MatExpansionModule, CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  openUniqueWork = signal(false)
  panelOpenState = signal(false);
  openRoom = signal(false)
  openCertificate = signal(false)
  product : Image
  subscription= new Subscription()
  constructor(private readonly productsService: CategoriesService, private readonly route: ActivatedRoute, private cartService:CartService, private favoritesService:FavoritesService){}
  ngOnInit(){
    this.getProduct()
    
  }
  getProduct(){
    this.subscription = this.route.params.pipe(
      switchMap((params)=> this.productsService.getImage(params['id']))).subscribe(v=> this.product = v)
  }
  handleAccordion(){
    this.panelOpenState.update((v=>!v))
  }

  handleRoom(){
    this.openRoom.update(v=> !v)
    
  }
  handleUniqueWork(){
    this.openUniqueWork.update(v=>!v)
    console.log(this.openUniqueWork())
  }
  handleAddToCart(item:Image){
    this.cartService.addInCart(item)
  }
  handleAddToFavorites(item:Image){
    this.favoritesService.addInFavorites(item)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
