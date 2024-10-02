import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup
  passwordMissMatch: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  ngOnInit () {
    this.initForm();
  }
  //da se proverat validatorite
  initForm () {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cardNo: new FormControl('', [Validators.required]),
      expireDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  };
  
  submit () {
//proverka na password-ot pred da se pusti request do backend
    const registerPassword = this.registerForm.get('password')?.value;
    const confirmedPassword = this.registerForm.get('confirmPassword')?.value;

    if(registerPassword !== confirmedPassword){
      console.log('Passwords do not match')
      this.passwordMissMatch = true;
      return;
    } else{
      this.passwordMissMatch = false
    };
    
// ako e vo red se registrira i prakja register do backend

    console.log(this.registerForm.value)
  const { firstName, lastName, userName, email, cardNo, expireDate, password } = this.registerForm.value
   this.authService.register(firstName, lastName, userName, email, cardNo, expireDate, password).subscribe((response)=> {
    console.log('Response from register', response);

    if(response){
      this.router.navigate(['/login'])
    }
   })
  };
  
}
