import { Injectable } from '@angular/core';
import { GENERATOR_API, STABILITY_KEY } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';


interface RequestBody{
  prompt: string
  negative_prompt: string
  aspect_ratio: string
  seed: number
  output_format: string
}


@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private readonly http:HttpClient) { }

  sendGenerationRequest(params: RequestBody) {
    // Send the HTTP request
    const response = this.http.post(GENERATOR_API, {...params
    }).pipe(
      catchError((error)=>{
        console.log(error)
        return of(null)
      })
    );
    console.log(response)
    return response;
}
}
