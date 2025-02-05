package BNA.wallet.WalletTransaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class WalletTransactionService {
    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    // Create
    public WalletTransaction createTransaction(WalletTransaction transaction) {

        return walletTransactionRepository.save(transaction);
    }

    // Read (Get All)
    public List<WalletTransaction> getAllTransactions() {
        return walletTransactionRepository.findAll();
    }

    // Read (Get By ID)
    public Optional<WalletTransaction> getTransactionById(UUID id) {
        return walletTransactionRepository.findById(id);
    }

    // Update
    public WalletTransaction updateTransaction(UUID id, WalletTransaction transactionDetails) {
        WalletTransaction transaction = walletTransactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setType(transactionDetails.getType());
        transaction.setTimestamp(transactionDetails.getTimestamp());
        return walletTransactionRepository.save(transaction);
    }

    // Delete
    public void deleteTransaction(UUID id) {
        walletTransactionRepository.deleteById(id);
    }
}
