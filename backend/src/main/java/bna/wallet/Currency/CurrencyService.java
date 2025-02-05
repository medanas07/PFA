package BNA.wallet.Currency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {
    @Autowired
    public CurrencyService(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    private CurrencyRepository currencyRepository;

    // Create
    public Currency createCurrency(Currency currency) {
        return currencyRepository.save(currency);
    }

    // Read (Get All)
    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    // Read (Get By ID)
    public Optional<Currency> getCurrencyById(Long id) {
        return currencyRepository.findById(id);
    }


    // Delete
    public void deleteCurrency(Long id) {
        currencyRepository.deleteById(id);
    }




}
