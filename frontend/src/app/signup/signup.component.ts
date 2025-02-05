import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule]
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  signup() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Ensure required fields are filled
    if (this.username && this.email && this.password) {
      console.log('🔄 Attempting to sign up with:', this.username, this.email, this.password);
      this.authService.signup(this.username, this.email, this.password).subscribe(
        (response) => {
          console.log('✅ Signup successful:', response);
          alert('Signup successful');
        },
        (error) => {
          console.error('❌ Signup failed:', error);
          alert('Signup failed: ' + error.error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
