import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Subscription, Observable, map } from 'rxjs';
import { CartService } from '../services/cart.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { AsyncPipe } from '@angular/common';
import { Image } from '../types/image.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,MatStepperModule, CartTableComponent,CartFormComponent, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Image[]
  subscription = new Subscription()
  stepperOrientation: Observable<StepperOrientation>;
  constructor(private readonly cartService: CartService){
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
  ngOnInit(){
    this.subscription = this.cartService.$cart.subscribe((data)=>this.cart = data)
  }

}
