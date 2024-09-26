import { Component, input, signal } from '@angular/core';
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
  categories = Object.values(Category)
  artists = input<string[]>([])
  sortBy = SortBy
  sortDirection = SortDirection
  readonly panelOpenState = signal(false);
  handleAccordion(){
    this.panelOpenState.update((v)=>!v)
  }

  handleRadioBtns(event: MatRadioChange){
    console.log(event.value)
  }
}
