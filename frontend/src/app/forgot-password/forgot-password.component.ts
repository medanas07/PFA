import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports:[FormsModule]
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  resetPassword() {
    if (this.email.trim()) {
      this.authService.forgotPassword(this.email).subscribe(
        (response) => {
          alert('Password reset link sent to your email');
        },
        (error) => {
          alert('Error: ' + (error.error?.error || 'Something went wrong'));
        }
      );
    } else {
      alert('Please enter your email');
    }
  }
}
