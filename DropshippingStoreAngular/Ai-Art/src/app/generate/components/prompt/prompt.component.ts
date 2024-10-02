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

  // generateImage() {



  // Make the request using the modified sendGenerationRequest, and handle it with .then() and .catch()
  //   this.generatorService.sendGenerationRequest(this.value)
  //     .then((data) => {
  //       if (data?.image) {
  //         this.response.set(data.image); // Adjust according to your actual response

  //         // Fetch the image if the response contains the image URL
  //         fetch(data.image)
  //           .then(response => {
  //             if (!response.ok) {
  //               throw new Error('Network response was not ok');
  //             }
  //             return response.blob(); // Convert response to Blob
  //           })
  //           .then(blob => {
  //             const imageUrl = URL.createObjectURL(blob); // Create an Object URL for the Blob
  //             this.response.set(imageUrl); // Set the new image URL in response
  //           })
  //           .catch(error => {
  //             console.error('Error fetching image:', error);
  //           });
  //       } else {
  //         console.error('No image URL in response');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error generating image:', error);
  //     });
  // }


  // }

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
  test(img:Blob){
    let raeder  = new FileReader()
    if(img){
      let item  = raeder.readAsDataURL(img)
      console.log(item)
      this.image = item
    }
  }
}
