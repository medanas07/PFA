export interface WalletTransaction {
    id?: string;
    timestamp: number;
    amount: number;
    type: WalletTransactionType;

  }

  export enum WalletTransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER',
  }

  export interface Wallet {
    id: string;

  }

  export interface Currency {
    id: string;

  }
