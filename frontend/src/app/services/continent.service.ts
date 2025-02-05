import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Continent } from '../models/continent.model';
import { KeycloakService } from '../services/keycloak.service';  // Import Keycloak service

@Injectable({
  providedIn: 'root'
})
export class ContinentService {
  private apiUrl = 'http://localhost:8081/continents';
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);  // Inject Keycloak service

  // Get the authorization headers with the token from Keycloak
  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getKeycloakToken();
    console.log('Keycloak Token:', token); // Debugging
    if (!token) {
      console.error('No token found!');
    }
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Get all continents
  getContinents(): Observable<Continent[]> {
    return this.http.get<Continent[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get a continent by ID
  getContinent(id: number): Observable<Continent> {
    return this.http.get<Continent>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new continent
  createContinent(continent: Continent): Observable<Continent> {
    return this.http.post<Continent>(this.apiUrl, continent, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update a continent
  updateContinent(id: number, continent: Continent): Observable<Continent> {
    return this.http.put<Continent>(`${this.apiUrl}/${id}`, continent, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete a continent
  deleteContinent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
