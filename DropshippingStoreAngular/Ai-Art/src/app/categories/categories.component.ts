import { Component, effect, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { AppStore } from '../store/app.store';
import { MatPaginatorModule} from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { FiltersComponent } from './components/filters/filters.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SearchComponent } from './components/search/search.component';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [AsyncPipe, CommonModule, CardContainerComponent, MatPaginatorModule, FiltersComponent, GalleryComponent, SearchComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  readonly productStore = inject(AppStore)
  
  subscription: Subscription = new Subscription()
  constructor(private readonly categoryService: CategoriesService){
    effect(()=>{
      this.productStore.setIsLoading(true)
    },{allowSignalWrites:true})
  }
  ngOnInit(){
    this.getImages()
    
  }
  
  getImages(){
    this.subscription = this.categoryService.getImages().subscribe((v)=>{
      this.productStore.setTotal(v.length)
      this.productStore.setProducts(v)
      this.productStore.setIsLoading(false)
    })
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
