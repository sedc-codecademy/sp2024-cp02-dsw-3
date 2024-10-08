import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  [x: string]: any;
  appStore = inject(AppStore)
  loginForm: FormGroup
  
  constructor (public readonly authService:AuthService, private readonly router: Router) {
    effect(()=>{

    },{allowSignalWrites:true})
  }
  
  ngOnInit () {
    this.initForm();
  }
  
  initForm () {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  };
  
  
  submit () {
    console.log(this.loginForm.value)
    const { userName, password } = this.loginForm.value
    this.authService.login(userName, password).subscribe((response) => {
      console.log(response);
      if(response?.token){
        this.appStore.setIsAuth(true)
        this.router.navigate(['/'])
      };
    });
  };
  
  submitLogout(){
    this.authService.logout()
    this.appStore.setIsAuth(false)
  };
  }
  

