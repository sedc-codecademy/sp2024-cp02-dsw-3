import { Component, effect, inject, output } from '@angular/core';
import { AppStore } from '../../../store/app.store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Category } from '../../../types/category.enum';
import { Creation } from '../../../types/creation.interface';
@Component({
  selector: 'app-list-image-form',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './list-image-form.component.html',
  styleUrl: './list-image-form.component.css'
})
export class ListImageFormComponent {
  
  appStore = inject(AppStore)
  creationForm: FormGroup
  categories = Object.values(Category)
  desc = this.appStore.prompt()
  constructor(){
    effect(()=>{

    },{allowSignalWrites: true})
  }
  ngOnInit(){
    this.creationForm = new FormGroup({
      description: new FormControl(Validators.required),
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
      user: 'userOne',
      image: this.appStore.stringifyCreationImage()
    }
    console.log(requestBody)
  }

}
