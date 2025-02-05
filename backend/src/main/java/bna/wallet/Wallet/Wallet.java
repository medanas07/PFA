package BNA.wallet.Wallet;

import BNA.wallet.WalletTransaction.WalletTransaction;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;


import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table()
public class Wallet {
    @Id
    @GeneratedValue
    private UUID id;

    @JsonFormat( pattern = "yyyy-MM-dd")
    private Date createdAt;



    @Column(unique = true)
    private String userId;

    private double balance;



    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WalletTransaction> transactions;



    public Wallet(double balance, Date createdAt, String userId) {
        this.balance = balance;
        this.createdAt=createdAt; // Appel du setter pour la conversion de la date
        this.userId = userId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Wallet() {}

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }



    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isPresent() {
        return id != null;
    }


}
