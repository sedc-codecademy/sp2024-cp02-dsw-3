import { Component, inject, input } from '@angular/core';
import { AppStore } from '../../../store/app.store';

@Component({
  selector: 'app-list-image-form',
  standalone: true,
  imports: [],
  templateUrl: './list-image-form.component.html',
  styleUrl: './list-image-form.component.css'
})
export class ListImageFormComponent {
  appStore = inject(AppStore)
  
}
