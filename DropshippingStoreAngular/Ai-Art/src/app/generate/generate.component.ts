import { Component, signal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PromptComponent } from "./components/prompt/prompt.component";

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [MatTabsModule, PromptComponent],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
  secondTab = signal<boolean>(true)
  image = 'gallery/gallery4.jpg'

  handleSecondTab(){
    this.secondTab.update(v=>!v)
  }
}
