export class Currency {
    id!: number;
    name!: string;
    code!: string;
    symbol!: string;
    price!: number;
    transactions !: any[]; // Vous pouvez créer un modèle pour WalletTransaction si nécessaire
    countries !: any[]; // Vous pouvez créer un modèle pour Country si nécessaire
  }