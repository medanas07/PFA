import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
      private router: Router
    ) {}
  tables = [
    { name: 'Wallet', crudOptions: [
        { name: 'Create New Wallet', route: '/Create-New-Wallet' },
        { name: 'See All Wallets', route: '/wallets' }
      ] 
    },
    { name: 'WalletTransaction', crudOptions: [
        { name: 'Create New Transaction', route: '/wallet-transactions/create' },
        { name: 'See All Transactions', route: '/wallet-transactions' }
      ] 
    },
    { name: 'Continent', crudOptions: [
        { name: 'Create New Continent', route: '/continents/create' },
        { name: 'See All Continents', route: '/continents' }
      ] 
    },
    { name: 'Country', crudOptions: [
        { name: 'Create New Country', route: '/countries/create' },
        { name: 'See All Countries', route: '/countries' }
      ] 
    },
    { name: 'Currency', crudOptions: [
        { name: 'Create New Currency', route: '/currencies/create' },
        { name: 'See All Currencies', route: '/currencies' }
      ] 
    }
  ];
  showCrudMenu: { [key: string]: boolean } = {};

  
  selectTable(route: string): void {
    this.router.navigate([route]);
  }

  toggleCrudMenu(tableName: string): void {
    this.showCrudMenu[tableName] = !this.showCrudMenu[tableName];
  }
}
