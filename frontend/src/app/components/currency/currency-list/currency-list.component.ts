
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency.model';
import { NgFor } from '@angular/common';
import { HomeComponent } from '../../../home/home.component';
@Component({
  selector: 'app-currency-list',
  imports: [NgFor,HomeComponent],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.css'
})
export class CurrencyListComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe(
      data => this.currencies = data,
      error => console.error('Error fetching currencies', error)
    );
  }

  deleteCurrency(id: number): void {
    this.currencyService.deleteCurrency(id).subscribe(
      () => this.loadCurrencies(),
      error => console.error('Error deleting currency', error)
    );
  }

}
