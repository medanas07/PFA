import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';  // Backend URL for authentication

  constructor(private http: HttpClient) {}

  // Signup request to backend
  signup(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  // Login request to backend (optional if you're using Keycloak for authentication)
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Forgot password request to backend (you can implement Keycloak's reset flow)
  forgotPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.apiUrl}/forgot-password`, body);
  }
}
