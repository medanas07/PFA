package BNA.wallet.Currency;

import BNA.wallet.Wallet.Wallet;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/currencies")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CurrencyController {
    private final CurrencyRepository currencyRepository;

    @Autowired
    public CurrencyController(CurrencyService currencyService, CurrencyRepository currencyRepository) {
        this.currencyService = currencyService;
        this.currencyRepository = currencyRepository;
    }

    private CurrencyService currencyService;

    // Create
    @PostMapping
    public ResponseEntity<Currency> createCurrency(@RequestBody Currency currency) {
        Currency createdCurrency = currencyService.createCurrency(currency);
        return ResponseEntity.ok(createdCurrency);
    }

    // Read (Get All)
    @GetMapping
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        List<Currency> currencies = currencyService.getAllCurrencies();
        return ResponseEntity.ok(currencies);
    }

    // Read (Get By ID)
    @GetMapping("/{id}")
    public ResponseEntity<Currency> getCurrencyById(@PathVariable Long id) {
        return currencyService.getCurrencyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @Transactional
    @PutMapping
    public ResponseEntity<Currency> putWallet(@RequestBody Currency currencyDetails) {
        if (currencyDetails == null || currencyDetails.getId() == 0) {
            return ResponseEntity.badRequest().build(); // Handle invalid input
        }

        Optional<Currency> existingCurrencyOpt = currencyRepository.findById(currencyDetails.getId());

        if (existingCurrencyOpt.isPresent()) {
            Currency existingCurrency = existingCurrencyOpt.get();
            if (StringUtils.hasText(currencyDetails.getName())) {
                existingCurrency.setName(currencyDetails.getName());
            }
            if (StringUtils.hasText(currencyDetails.getSymbol())) {
                existingCurrency.setSymbol(currencyDetails.getSymbol());
            }
            if (currencyDetails.getPrice() != 0) {
                existingCurrency.setPrice(currencyDetails.getPrice());
            }
            if (!Objects.equals(currencyDetails.getCountries(), existingCurrency.getCountries())) {
                existingCurrency.setCountries(currencyDetails.getCountries());
            }
            if (!Objects.equals(currencyDetails.getTransactions(), existingCurrency.getTransactions())) {
                existingCurrency.setTransactions(currencyDetails.getTransactions());
            }

            Currency updatedCurrency = currencyRepository.save(existingCurrency);
            return ResponseEntity.ok(updatedCurrency);
        } else {
            Currency newCurrency = currencyRepository.save(currencyDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(newCurrency);
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurrency(@PathVariable Long id) {
        currencyService.deleteCurrency(id);
        return ResponseEntity.noContent().build();
    }
}
