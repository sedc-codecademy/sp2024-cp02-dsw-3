import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GENERATOR_API, STABILITY_KEY } from '../../../../environment';
import { AppStore } from '../../../store/app.store';
import { GeneratorService, ResponseApi } from '../../../services/generator.service';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  isCreated = output<boolean>()
  appStore = inject(AppStore)
  value = "" //ova vrednost treba da se zapise vo store
  subscription = new Subscription
  response = signal<any | null>(null)
  blob = signal(null)
  image: any
  constructor(private generatorService: GeneratorService, private sanitizer: DomSanitizer,) { }

  generateImage() {

    this.subscription = this.generatorService.sendGenerationRequest(this.value).pipe(
      // map((res)=>{
      //   const jsonString = JSON.stringify(res)
      //   return new Blob([jsonString],{type: 'image/png'})})
    ).subscribe(
      (data) => {
        if(data){
          const jsonString = JSON.stringify(data)
          const blob = new Blob([jsonString], { type: 'image/png' }); // Specify the appropriate MIME type
          // this.test(blob)
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl)
          this.image = imageUrl
        }
        
      }
    );

    
  }

}
