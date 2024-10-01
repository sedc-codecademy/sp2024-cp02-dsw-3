import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GENERATOR_API, STABILITY_KEY } from '../../../../environment';
import { AppStore } from '../../../store/app.store';
import { GeneratorService } from '../../../services/generator.service';
import { catchError, map, of, Subscription } from 'rxjs';
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
  value ="" //ova vrednost treba da se zapise vo store
  subscription = new Subscription
  response = signal<any | null>(null)
  blob= signal(null)
  constructor(private generatorService: GeneratorService){}

  
  generateImage() {
    const params = {
      prompt: this.value,
      negative_prompt: "nature",
    aspect_ratio: "3:2",
    seed: 0,
    output_format: "PNG"
    }
    console.log(params)
    this.subscription = this.generatorService.sendGenerationRequest(params).subscribe((data)=>{
      console.log('data', data)
      this.response.set(data)

      
    })
    console.log('in prompt component')
    // const host = 'https://api.stability.ai/v2beta/stable-image/generate/ultra';

    // try {
    //     const response = await this.generatorService.sendGenerationRequest(params);


    //     if (!response.ok) {
    //         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    //     }

    //     const blob = await response.blob();
    //     const finishReason = response.headers.get('finish-reason');

    //     if (finishReason === 'CONTENT_FILTERED') {
    //         throw new Error("Generation failed NSFW classifier");
    //     }

    //     const seed = response.headers.get('seed');
    //     const url = URL.createObjectURL(blob);
    //     console.log('URL', url)
    //     this.appStore.setCreatedImage(url)
    //     this.appStore.setPrompt(this.value)
    //     // document.getElementById('generatedImage').src = url;

    //     console.log(`Saved image with seed: ${seed}`);
    // } catch (error) {
    //     console.log('Error:', error);
    // }
}



  
}
