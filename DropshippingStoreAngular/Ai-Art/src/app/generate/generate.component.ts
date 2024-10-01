import { Component, signal, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PromptComponent } from "./components/prompt/prompt.component";
import { ListImageFormComponent } from './components/list-image-form/list-image-form.component';
import { STABILITY_KEY } from '../../environment';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [MatTabsModule, PromptComponent, ListImageFormComponent],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
  
  image = signal<boolean>(false)  //ovde treba da dojde slikata sto ke bide generirana 
  
  // async handleCreateImage(){
  //   this.generatorService.
  // }
  // handleSecondTab(){
  //   this.secondTab.update(v=>!v)
  // }

  
}
