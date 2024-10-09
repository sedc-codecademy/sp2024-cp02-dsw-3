import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {
  @Output() userInfoUpdated = new EventEmitter<void>();
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
    const userName = this.route.snapshot.paramMap.get('userName');
    console.log(userName)

    if (userName) {
      this.accountService.getUserInfo(userName).subscribe({
        next: (data) => {
          this.userInfoForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            userName: data.userName || '',
            email: data.email || '',
            cardNo: data.cardNo || '',
            expireDate: data.expireDate || '',
          });
        },
        error: (error) => {
          console.error('Error fetching user info', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      const updatedInfo: any = this.userInfoForm.value;

      // Assuming you want to skip empty values for the update.
      const userName = updatedInfo.userName;

      this.accountService.updateUserInfo(userName, updatedInfo).subscribe({
        next: (response) => {
          console.log('User info updated!', response);
          this.userInfoUpdated.emit();
        },
        error: (error) => {
          console.error('Error updating user info', error);
        }
      });
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
  }
}
