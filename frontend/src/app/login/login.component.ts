import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule,RouterLink,RouterLinkActive]
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService) {}

  login() {
    if (this.userName && this.password) {
      this.authService.login(this.userName, this.password).subscribe(
        (response) => {
          alert('Login Successful');
          // Store JWT token in localStorage if needed
          localStorage.setItem('token', response.token);
        },
        (error) => {
          alert('Invalid credentials');
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }
}
