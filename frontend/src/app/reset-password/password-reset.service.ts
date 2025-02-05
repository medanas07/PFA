// src/app/services/password-reset.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';  // Import Keycloak service

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8081/api'; // Adjust your backend API URL
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);  // Inject Keycloak service

  constructor(private httpClient: HttpClient) {}

  // Helper method to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getKeycloakToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Reset password request with token and new password
  resetPassword(token: string | null, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/reset-password`, 
      { token, newPassword }, 
      { headers: this.getAuthHeaders() }
    );
  }
}
