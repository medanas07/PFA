import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = '/api/currencies';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  getCurrency(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.apiUrl}/${id}`);
  }

  createCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.apiUrl, currency);
  }

  updateCurrency(id: number, currency: Currency): Observable<Currency> {
    return this.http.put<Currency>(`${this.apiUrl}/${id}`, currency);
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}