package BNA.wallet.WalletTransaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/transactions")
public class WalletTransactionController {
    @Autowired
    public WalletTransactionController(WalletTransactionService walletTransactionService) {
        this.walletTransactionService = walletTransactionService;
    }

    private WalletTransactionService walletTransactionService;

    // Create
    @PostMapping
    public ResponseEntity<WalletTransaction> createTransaction(@RequestBody WalletTransaction transaction) {
        WalletTransaction createdTransaction = walletTransactionService.createTransaction(transaction);
        return ResponseEntity.ok(createdTransaction);
    }

    // Read (Get All)
    @GetMapping
    public ResponseEntity<List<WalletTransaction>> getAllTransactions() {
        List<WalletTransaction> transactions = walletTransactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    // Read (Get By ID)
    @GetMapping("/{id}")
    public ResponseEntity<WalletTransaction> getTransactionById(@PathVariable UUID id) {
        return walletTransactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<WalletTransaction> updateTransaction(@PathVariable UUID id, @RequestBody WalletTransaction transactionDetails) {
        WalletTransaction updatedTransaction = walletTransactionService.updateTransaction(id, transactionDetails);
        return ResponseEntity.ok(updatedTransaction);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable UUID id) {
        walletTransactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
