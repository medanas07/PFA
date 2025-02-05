import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../wallet-form/wallet.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css'],
  imports: [CommonModule,HomeComponent],
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private walletService: WalletService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllWallets();
  }

  fetchAllWallets(): void {
    this.loading = true;
    this.walletService.getAllWallets().subscribe({
      next: (response) => {
        this.wallets = response;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'An error occurred while fetching wallets.';
        this.loading = false;
      },
    });
  }

  updateWallet(wallet: Wallet): void {
    // Ensure you are passing the userId to the update page
    this.router.navigate(['/wallets/update', wallet.userId]);
  }
  

  deleteWallet(wallet: Wallet): void {
    if (wallet && wallet.id) {
      const id = wallet.id.toString();
      if (confirm('Are you sure you want to delete this wallet?')) {
        this.walletService.deleteWalletById(id).subscribe({
          next: () => {
            this.fetchAllWallets();
            alert('Wallet deleted successfully!');
          },
          error: (error) => {
            this.errorMessage = 'An error occurred while deleting the wallet: ' + error.message;
          },
        });
      }
    } else {
      this.errorMessage = 'Invalid wallet id.';
    }
  }
}
