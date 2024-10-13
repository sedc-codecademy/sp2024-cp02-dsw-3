import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../types/user-info.interface';

@Component({
  selector: 'app-change-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {
  userInfo = signal<UserInfo | null>(null);
  userInfoForm: FormGroup;
  successMessage: string | null = null; 
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private readonly accountService: AccountService
  ) {
    this.userInfoForm = this.fb.group({
      firstName: ['', [Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      userName: ['', [Validators.minLength(3)]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]],
      email: ['', [Validators.email]],
      cardNo: ['', [Validators.pattern(/^\d{16}$/)]],
      expireDate: ['', [Validators.pattern(/^(0[1-9]|1[0-9])\/?([0-9]{2})$/)]],
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    this.accountService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info response:', data);
        this.userInfo.set(data.userInfo);
        this.userInfoForm.patchValue(data.userInfo);
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      },
      complete: () => {
        console.log('User info fetch complete');
      }
    });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      const updatedUserInfo = this.userInfoForm.value;

      this.accountService.updateUserInfo(updatedUserInfo).subscribe({
        next: () => {
          console.log('User info updated successfully');
          this.successMessage = 'User info updated successfully!'; 
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          console.error('Error updating user info:', error);
          this.successMessage = null; 
        }
      });
    } else {
      console.error('Form is invalid');
      this.successMessage = null; 
    }
  }
}
