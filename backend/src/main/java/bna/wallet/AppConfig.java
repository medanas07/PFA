package BNA.wallet;

import BNA.wallet.Continent.Continent;
import BNA.wallet.Country.Country;
import BNA.wallet.Currency.Currency;
import BNA.wallet.Wallet.Wallet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public Wallet wallet() {
        return new Wallet();
    }

    @Bean
    public Continent continent() {
        return new Continent();
    }

    @Bean
    public Country country() {
        return new Country();
    }

    @Bean
    public Currency currency() {
        return new Currency();
    }

    @Bean
    public BNA.wallet.WalletTransaction.WalletTransaction walletTransaction() {
        return new BNA.wallet.WalletTransaction.WalletTransaction();
    }
}
