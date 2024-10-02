import { Injectable } from '@angular/core';
import { GENERATOR_API, STABILITY_KEY } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';


interface RequestBody {
  prompt: string
  negative_prompt: string
  aspect_ratio: string
  seed: number
  output_format: string
}
export interface ResponseApi {
  seed: number,
  image: string,
  finish_reason: string
}
export interface Params {
  [key: string]: string | number | File | Blob | object;
}

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private readonly http: HttpClient) { }

  sendGenerationRequest(prompt: String) {
    const formData = new FormData();

    formData.append('prompt', `${prompt}`);
    formData.append('negative_prompt', `nature`);
    formData.append('aspect_ratio', `3:2`);
    formData.append('seed', `0`);
    formData.append('output_format', "png");

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${STABILITY_KEY}`,
      // 'Accept': 'image/*'

    });
    
    const response = this.http.post<ResponseApi>(GENERATOR_API, formData, { headers }).pipe(
      catchError((error) => {
        console.log(error)
        return of(null)
      })
    );
    console.log(response)
    return response;
  }
}
