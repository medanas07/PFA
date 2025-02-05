// src/app/components/reset-password/reset-password.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from './password-reset.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string | null = null;
  resetPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    // Get the reset token from URL
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'];
    });
    
    // Ensure the form controls are marked as dirty when the form is initialized
    this.resetPasswordForm.controls['password'].markAsDirty();
    this.resetPasswordForm.controls['confirmPassword'].markAsDirty();
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordsDontMatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;

      // Call the password reset service
      this.passwordResetService
        .resetPassword(this.resetToken, password)
        .subscribe(
          (response) => {
            alert('Password reset successfully!');
          },
          (error) => {
            alert('Error resetting password');
          }
        );
    }
  }
}
