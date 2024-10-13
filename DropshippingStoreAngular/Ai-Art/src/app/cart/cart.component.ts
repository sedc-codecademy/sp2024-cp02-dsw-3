import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { AsyncPipe } from '@angular/common';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,MatStepperModule, CartTableComponent,CartFormComponent, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  appStore = inject(AppStore)

}
