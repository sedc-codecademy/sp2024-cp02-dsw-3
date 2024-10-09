import { Component, effect, inject } from '@angular/core';
import { AppStore } from '../../../store/app.store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Creation } from '../../../types/creation.interface';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../../loader/loader.component";

@Component({
  selector: 'app-list-image-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatTabsModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, LoaderComponent],
  templateUrl: './list-image-form.component.html',
  styleUrl: './list-image-form.component.css'
})
export class ListImageFormComponent {
  
  appStore = inject(AppStore)
  creationForm: FormGroup
  desc = this.appStore.prompt()

  
  constructor(private router: Router){
    effect(()=>{

    },{allowSignalWrites: true})
  }
  ngOnInit(){
    this.creationForm = new FormGroup({
      description: new FormControl(`${this.appStore.prompt()}`,Validators.required),
      price: new FormControl('',[Validators.required]),
      category: new FormControl('', [Validators.required])
    })
    
  }

  handleSubmit(){
    console.log(this.creationForm.value)
    const requestBody:Creation = {
      category: this.creationForm.get('category')?.value,
      description: this.creationForm.get('description')?.value,
      price: this.creationForm.get('price')?.value,
      image: this.appStore.stringifyCreationImage()
    }
    console.log(requestBody)

    //otkako ke se kreira ke treba userot da go vrati vo generate 
  }

  handleRemove(){
    this.appStore.setCreatedImage(null)
    this.appStore.setStringifyCreationImage('')
    this.appStore.setPrompt('')
    this.router.navigate(['/generate-your-art'])
  }
  
}
