import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WalletTransaction } from './wallet-transaction.model';
import { KeycloakService } from '../../services/keycloak.service'; // Import the Keycloak service

@Injectable({
  providedIn: 'root',
})
export class WalletTransactionService {
  private apiUrl = 'http://localhost:8081/transactions';
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService); // Inject the Keycloak service

  // Get the authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.keycloakService.getKeycloakToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Get all transactions
  getAllTransactions(): Observable<WalletTransaction[]> {
    return this.http.get<WalletTransaction[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get a transaction by ID
  getTransactionById(id: string): Observable<WalletTransaction> {
    return this.http.get<WalletTransaction>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new transaction
  createTransaction(transaction: WalletTransaction): Observable<WalletTransaction> {
    return this.http.post<WalletTransaction>(this.apiUrl, transaction, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing transaction
  updateTransaction(id: string, transaction: WalletTransaction): Observable<WalletTransaction> {
    return this.http.put<WalletTransaction>(`${this.apiUrl}/${id}`, transaction, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete a transaction
  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
