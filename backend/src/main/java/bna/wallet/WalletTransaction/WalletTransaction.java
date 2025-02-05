package BNA.wallet.WalletTransaction;

import BNA.wallet.Currency.Currency;
import BNA.wallet.Wallet.Wallet;
import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
@Data
@Entity
public class WalletTransaction {
    @Id
    @GeneratedValue
    private UUID id;

    private long timestamp;
    private double amount;

    @Enumerated(EnumType.STRING)
    private WalletTransactionType type;


    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;

    enum WalletTransactionType {
        DEPOSIT, WITHDRAWAL, TRANSFER
    }

    public WalletTransaction() {}

    public WalletTransaction(double amount, long timestamp, Wallet wallet) {
        this.amount = amount;
        this.timestamp = timestamp;
        this.wallet = wallet;
    }
    public void setWalletId(UUID walletId) {
        this.wallet = new Wallet();
        this.wallet.setId(walletId);
    }

    public void setCurrencyId(long currencyId) {
        this.currency = new Currency();
        this.currency.setId(currencyId);
    }
    public void setWalletId(String walletId) {
        this.wallet = new Wallet();
        this.wallet.setId(UUID.fromString(walletId));
    }
    public void setCurrencyId(String currencyId) {
        this.currency = new Currency();
    }
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }
}
