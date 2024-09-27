import { Component, signal, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PromptComponent } from "./components/prompt/prompt.component";
import { ListImageFormComponent } from './components/list-image-form/list-image-form.component';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [MatTabsModule, PromptComponent, ListImageFormComponent],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
  secondTab = signal<boolean>(true)
  image = signal('gallery/gallery4.jpg')  //ovde treba da dojde slikata sto ke bide generirana 
  
  handleSecondTab(){
    this.secondTab.update(v=>!v)
  }
}
