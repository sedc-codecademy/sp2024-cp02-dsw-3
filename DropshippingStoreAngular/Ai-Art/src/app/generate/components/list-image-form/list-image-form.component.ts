import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-image-form',
  standalone: true,
  imports: [],
  templateUrl: './list-image-form.component.html',
  styleUrl: './list-image-form.component.css'
})
export class ListImageFormComponent {
  image= input.required<string>()
}
