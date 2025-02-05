import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../wallet-form/wallet.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-wallet-update',
  templateUrl: './wallet-update.component.html',
  styleUrls: ['./wallet-update.component.css'],
  imports:[CommonModule,FormsModule,HomeComponent]
})
export class WalletUpdateComponent implements OnInit {
  wallet: Wallet = new Wallet('',0, '','');
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private walletService: WalletService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.fetchWallet(userId);
    }
  }

  fetchWallet(userId: string): void {
    this.loading = true;
    this.walletService.getWalletByUserId(userId).subscribe({
      next: (response) => {
        this.wallet = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching wallet:', error);
        this.errorMessage = 'Erreur lors de la récupération du wallet.';
        this.loading = false;
      },
    });
  }

  // In your WalletUpdateComponent
updateWallet(): void {
  if (!this.wallet.id || !this.isValidUUID(this.wallet.id)) {
    this.errorMessage = 'L\'ID du wallet est manquant ou invalide.';
    return;
  }

  this.loading = true;
  console.log("Wallet data being sent:", this.wallet);

  this.walletService.updateWallet(this.wallet).subscribe({
    next: () => {
      alert('Wallet mis à jour avec succès !');
      this.router.navigate(['/wallets']);
    },
    error: (error) => {
      console.error('Error updating wallet:', error);
      this.errorMessage = 'Erreur lors de la mise à jour du wallet.';
      this.loading = false;
    },
  });
}

// Utility function to validate UUID
isValidUUID(uuid: string): boolean {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}

  
  
}
