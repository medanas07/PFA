import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from './currency.model';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:8088/currencies';

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  getCurrencyById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.apiUrl}/${id}`);
  }

  createCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.apiUrl, currency);
  }

  updateCurrency(currency: Currency): Observable<Currency> {
    return this.http.put<Currency>(this.apiUrl, currency);
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
