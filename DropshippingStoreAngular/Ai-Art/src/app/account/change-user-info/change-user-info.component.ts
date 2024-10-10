import { Component, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  userInfo = signal<UserInfo | null>(null)
  userInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private readonly accountService: AccountService) {
    this.userInfoForm = this.fb.group({
      firstName: ['', [Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      userName: ['', [Validators.minLength(3)]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]],
      email: ['', [Validators.email]],
      cardNo: ['', [Validators.pattern(/^\d{16}$/)]],
      expireDate: ['', [Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
    });
  }

  ngOnInit(): void {
    
        // Fetch user info from the service
    this.accountService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info response:', data);
        this.userInfo.set(data.userInfo); // Update the signal with the fetched data
        
        // Populate the form with user data
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

  onSubmit() {
    if (this.userInfoForm.valid) {
      const updatedUserInfo = this.userInfoForm.value;

      // Call a service method to update the user info
      this.accountService.updateUserInfo(updatedUserInfo).subscribe({
        next: () => {
          console.log('User info updated successfully');
        },
        error: (error) => {
          console.error('Error updating user info:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  }

