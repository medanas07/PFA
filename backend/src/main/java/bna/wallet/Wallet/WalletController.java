package BNA.wallet.Wallet;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("Wallet")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WalletController {
    private final WalletService walletService;
    private final WalletRepository walletRepository;

    @Autowired
    public WalletController(WalletRepository walletRepository, WalletService walletService) {
        this.walletRepository = walletRepository;
        this.walletService = walletService;
    }

    @PostMapping("")
    public ResponseEntity<Wallet> addWallet(@RequestBody Wallet wallet) {
        return ResponseEntity.ok(walletRepository.save(wallet));
    }

    @GetMapping("")
    public List<Wallet> getAllWallets() {
        return walletRepository.findAll();
    }

    @GetMapping("/ShowWalletById/{id}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable("id") UUID id) {
        return walletRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{userId}")
    public List<Wallet> getWalletsByUserId(@PathVariable("userId") String userId) {
        return walletRepository.findAllByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id) {
        if (walletRepository.existsById(id)) {
            walletService.deleteWalletById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable UUID id, @RequestBody Wallet updatedWallet) {
        Optional<Wallet> existingWalletOpt = walletRepository.findById(id);

        if (existingWalletOpt.isPresent()) {
            Wallet existingWallet = existingWalletOpt.get();

            if (updatedWallet.getBalance() != 0) {
                existingWallet.setBalance(updatedWallet.getBalance());
            }
            if (updatedWallet.getCreatedAt() != null) {
                existingWallet.setCreatedAt(updatedWallet.getCreatedAt());
            }
            if (updatedWallet.getUserId() != null) {
                existingWallet.setUserId(updatedWallet.getUserId());
            }

            return ResponseEntity.ok(walletRepository.save(existingWallet));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
