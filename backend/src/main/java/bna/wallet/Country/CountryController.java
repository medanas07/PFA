package BNA.wallet.Country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CountryController {
    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    private CountryService countryService;

    // Create
    @PostMapping
    public ResponseEntity<Country> createCountry(@RequestBody Country country1) {
        Country createdCountry = countryService.createCountry(country1);
        return ResponseEntity.ok(createdCountry);
    }

    // Read (Get All)
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    // Read (Get By ID)
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id) {
        return countryService.getCountryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable Long id, @RequestBody Country countryDetails) {
        Country updatedCountry = countryService.updateCountry(id, countryDetails);
        return ResponseEntity.ok(updatedCountry);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable Long id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
}
