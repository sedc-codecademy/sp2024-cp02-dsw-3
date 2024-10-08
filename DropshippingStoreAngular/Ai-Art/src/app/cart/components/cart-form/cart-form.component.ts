import { Component, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css'
})
export class CartFormComponent {
  formUntouched = signal<string>('')
  cardNoError = signal<string>('')
  checkout: FormGroup
  ngOnInit(){
    this.checkout = new FormGroup({
      
      fullName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      cardNo: new FormControl('',[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern(/^[0-9]\d*$/)]),
      cardDate: new FormControl('', [Validators.required, Validators.pattern(/^(11|12)\/24$|^(0[1-9]|10|11|12)\/2[5-9]$/), ]),
      cvvNo: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{3}$/)])
    })
  }
  errorMessage = signal('');
 

  checkoutSubmit(){
    console.log(this.checkout)
    this.checkForm()
  }

  checkForm(){
    this.resetErrorsMessages()
    if(!this.checkout.touched){
      this.formUntouched.set('You must fill all fields.')
      return
    } 
    if(this.checkout.invalid)return
    this.checkCardNumber()
    if(!this.cardNoError() && !this.checkout.invalid ){
      console.log(this.checkout.value)
    }
    
  }

  checkCardNumber(){
    if(this.checkout.get('cardNo')?.hasError('required')){
      this.cardNoError.set('Card number is required')
      return
    }
    let test = isNaN(Number(this.checkout.get('cardNo')?.value))
    console.log(test, 'test')
    if(test || this.checkout.get('cardNo')?.hasError('pattern') || this.checkout.get('cardNo')?.hasError('minlength') || this.checkout.get('cardNo')?.hasError('minlength')){
      this.cardNoError.set('Enter a valid card number')
      return
    } 
  }
  checkDate(date:string){
    if(date.charAt(0)==='0'){
      return true
    }
    return false
  }

  resetErrorsMessages(){
    this.formUntouched.set('')
    this.cardNoError.set('')
  }
}
