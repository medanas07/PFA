package BNA.wallet.Wallet;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class WalletService {
    private WalletRepository walletRepository;
    private Wallet wallet;

    @Autowired
    public WalletService(WalletRepository walletRepository,Wallet wallet) {
        this.walletRepository = walletRepository;
        this.wallet = wallet;
    }



    @Transactional
    public void deleteWalletById(UUID id) {
        walletRepository.deleteWalletById(id);

    }

}