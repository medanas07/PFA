// src/app/services/country.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { Currency } from '../models/currency.model';
import { Continent } from '../models/continent.model';
import { KeycloakService } from './keycloak.service';  // Import Keycloak service

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:8081/countries';
  private currencyUrl = 'http://localhost:8081/currencies';  // Assuming your backend exposes this
  private continentUrl = 'http://localhost:8081/continents';  // Assuming your backend exposes this
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);  // Inject Keycloak service

  // Get the authorization headers with token from Keycloak
  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getKeycloakToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Get all countries
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get a country by ID
  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get currencies
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currencyUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get continents
  getContinents(): Observable<Continent[]> {
    return this.http.get<Continent[]>(this.continentUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new country
  createCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing country
  updateCountry(id: number, country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${id}`, country, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete a country
  deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
