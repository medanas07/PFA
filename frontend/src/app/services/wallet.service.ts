import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../components/wallet-form/wallet.model';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = 'http://localhost:8081/Wallet'; // Backend API URL
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getKeycloakToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  createWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.apiUrl, wallet, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getWalletById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/ShowWalletById/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getWalletByUserId(userId: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteWalletById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(`${this.apiUrl}/${wallet.id}`, wallet, {
      headers: this.getAuthHeaders(),
    });
  }
}
