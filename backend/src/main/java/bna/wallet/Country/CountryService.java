package BNA.wallet.Country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    @Autowired
    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    private CountryRepository countryRepository;

    // Create
    public Country createCountry(Country country) {
        return countryRepository.save(country);
    }

    // Read (Get All)
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Read (Get By ID)
    public Optional<Country> getCountryById(Long id) {
        return countryRepository.findById(id);
    }

    // Update
    public Country updateCountry(Long id, Country countryDetails) {
        Country country = countryRepository.findById(id).orElseThrow(() -> new RuntimeException("Country not found"));
        country.setCountryName(countryDetails.getCountryName());
        country.setIsoCode(countryDetails.getIsoCode());
        country.setM49Code(countryDetails.getM49Code());
        country.setLongitude(countryDetails.getLongitude());
        country.setLatitude(countryDetails.getLatitude());
        country.setAltitude(countryDetails.getAltitude());
        return countryRepository.save(country);
    }

    // Delete
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }
}
