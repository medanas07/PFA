
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency.model';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../../home/home.component';
@Component({
  selector: 'app-currency-form',
  imports: [FormsModule,HomeComponent],
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.css'
  
})
export class CurrencyFormComponent  implements OnInit{
  currency: Currency = new Currency();

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.currencyService.createCurrency(this.currency).subscribe(
      data => console.log('Currency created', data),
      error => console.error('Error creating currency', error)
    );
  }

}
