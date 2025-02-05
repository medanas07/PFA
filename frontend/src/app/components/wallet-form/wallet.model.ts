export class Wallet {
  id?: string; // Correspond à UUID dans le backend
  createdAt: string| null; // Correspond à Date dans le backend
  userId: string; // Correspond à String dans le backend
  balance: number; // Correspond à double dans le backend
  transactions?: any[]; // Correspond à List<WalletTransaction> dans le backend

  constructor(id: string,balance: number, createdAt: string, userId: string) {
    this.id=id;
    this.balance = balance;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}