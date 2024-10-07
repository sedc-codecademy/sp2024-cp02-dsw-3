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
import { SearchImagesQuery } from '../types/searchImagesQuery.interface';
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
      this.getImages(this.productStore.searchParams())
    },{allowSignalWrites:true})
  }
  
  getImages(searchQuery: SearchImagesQuery = {}){
    this.subscription = this.categoryService.getImages(searchQuery).subscribe((response)=>{
      console.log(response)
      const {paginatedImages} = response
      this.productStore.setTotal(paginatedImages.totalCount)
      this.productStore.setProducts(paginatedImages.data)
      //i total pages ovde da se stavi vo store ako treba
      this.productStore.setIsLoading(false)
    })
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
