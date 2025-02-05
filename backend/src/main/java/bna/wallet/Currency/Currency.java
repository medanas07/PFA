package BNA.wallet.Currency;

import BNA.wallet.Country.Country;
import BNA.wallet.WalletTransaction.WalletTransaction;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Currency {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String code;
    private String symbol;
    private double price;
    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WalletTransaction> transactions;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Country> countries;
    public Currency() {}

    public Currency(String code, List<Country> countries, String name, double price, String symbol, List<WalletTransaction> transactions) {
        this.code = code;
        this.countries = countries;
        this.name = name;
        this.price = price;
        this.symbol = symbol;
        this.transactions = transactions;
    }


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public List<Country> getCountries() {
        return countries;
    }

    public void setCountries(List<Country> countries) {
        this.countries = countries;
    }

    public List<WalletTransaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<WalletTransaction> transactions) {
        this.transactions = transactions;
    }
}
