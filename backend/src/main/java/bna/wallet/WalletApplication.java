package BNA.wallet;

import BNA.wallet.Continent.ContinentRepository;
import BNA.wallet.Wallet.WalletRepository;
import BNA.wallet.WalletTransaction.WalletTransaction;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication

public class WalletApplication {

	public static void main(String[] args) {
		SpringApplication.run(WalletApplication.class, args);
	}


}
