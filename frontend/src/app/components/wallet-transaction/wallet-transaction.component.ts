
import { Component } from '@angular/core';
import { WalletTransactionService } from './wallet-transaction.service';
import { WalletTransaction } from './wallet-transaction.model';
import { WalletTransactionType } from './wallet-transaction.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../home/home.component';
@Component({
  selector: 'app-wallet-transaction',
  imports: [NgFor,FormsModule,CommonModule,HomeComponent],
  templateUrl: './wallet-transaction.component.html',
  styleUrl: './wallet-transaction.component.css'
})
export class WalletTransactionComponent {
  transactions: WalletTransaction[] = [];
  newTransaction: WalletTransaction = {
    timestamp: Date.now(),
    amount: 0,
    type:WalletTransactionType.DEPOSIT,

  };

  WalletTransactionType = WalletTransactionType;
  constructor(private transactionService: WalletTransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Charger toutes les transactions
  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (data) => (this.transactions = data),
      (error) => console.error('Erreur lors du chargement des transactions', error)
    );
  }

  // Créer une nouvelle transaction
  createTransaction(): void {
    console.log('Sending transaction:', this.newTransaction);
    this.transactionService.createTransaction(this.newTransaction).subscribe(
      (data) => {
        this.transactions.push(data);
        this.newTransaction = {
          timestamp: Date.now(),
          amount: 0,
          type: WalletTransactionType.DEPOSIT,

        };
      },
      (error) => console.error('Erreur lors de la création de la transaction', error)
    );
  }

  // Supprimer une transaction
  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe(
      () => {
        this.transactions = this.transactions.filter((t) => t.id !== id);
      },
      (error) => console.error('Erreur lors de la suppression de la transaction', error)
    );
  }

}
