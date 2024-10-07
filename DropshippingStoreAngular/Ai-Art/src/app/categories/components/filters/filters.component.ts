import { Component, input, output, OutputEmitterRef, signal } from '@angular/core';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Category } from '../../../types/category.enum';
import { SortBy, SortDirection } from '../../../types/sortBy.enum';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, MatSelectModule, MatFormFieldModule,MatRadioModule] ,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  selectedCategory = input.required<Category | undefined>()
  selectedArtist = input.required<string | undefined>()
  selectedDirection = input.required<SortDirection>()
  inStock = input.required<boolean | undefined>()
  updateSelectCategory = output<any>()
  updateSelectedArtist = output<any>()
  updateSelectedDirection = output<any>()
  updateInStock = output<any>()
  artists = input<string[]>([])
  sortBy = SortBy
  sortDirection = SortDirection
  readonly panelOpenState = signal(false);
  handleAccordion(){
    this.panelOpenState.update((v)=>!v)
  }

  handleRadioBtns(event: MatRadioChange, emitter:OutputEmitterRef<any> ){
    console.log(event.value)
    emitter.emit(event.value)
  }

  handleChange(event:any, emitter:OutputEmitterRef<any>){
    emitter.emit(event)
  }

  ngOnInit(){
    console.log(this.categories)
  }
}
