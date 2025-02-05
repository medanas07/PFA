import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Wallet } from './wallet.model';
import { WalletService } from '../../services/wallet.service';
import { DatePipe, NgIf } from '@angular/common';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
  imports :[ReactiveFormsModule,NgIf,HomeComponent],
  providers: [DatePipe]
})
export class WalletFormComponent {
  @Output() walletSubmitted = new EventEmitter<Wallet>();

  walletForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private datePipe: DatePipe // Injecter DatePipe
  ) {
    this.walletForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      createdAt: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.walletForm.valid) {
      // Convert the date into the correct format using DatePipe
      const formattedDate = this.datePipe.transform(this.walletForm.value.createdAt, 'yyyy-MM-dd') || '';
  
      const wallet: Wallet = {
        userId: this.walletForm.value.userId,
        balance: this.walletForm.value.balance,
        createdAt: formattedDate  // Send formatted date as string
      };
  
      console.log('Wallet being sent:', wallet); // Check the wallet object
  
      this.walletService.createWallet(wallet).subscribe({
        next: (response) => {
          console.log('Wallet created:', response);
          this.walletSubmitted.emit(response);
          this.walletForm.reset();
        },
        error: (error) => {
          console.error('Error creating wallet:', error);
        }
      });
    } else {
      console.error('Invalid form data');
    }
  }
  
  
  
  
  
  
}