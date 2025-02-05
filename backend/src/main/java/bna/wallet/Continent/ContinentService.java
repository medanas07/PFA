package BNA.wallet.Continent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContinentService {
    @Autowired
    public ContinentService(ContinentRepository continentRepository) {
        this.continentRepository = continentRepository;
    }

    private ContinentRepository continentRepository;

    // Create
    public Continent createContinent(Continent continent) {
        return continentRepository.save(continent);
    }

    // Read (Get All)
    public List<Continent> getAllContinents() {
        return continentRepository.findAll();
    }

    // Read (Get By ID)
    public Optional<Continent> getContinentById(Long id) {
        return continentRepository.findById(id);
    }

    // Update
    public Continent updateContinent(Long id, Continent continentDetails) {
        Continent continent = continentRepository.findById(id).orElseThrow(() -> new RuntimeException("Continent not found"));
        continent.setName(continentDetails.getName());
        return continentRepository.save(continent);
    }

    // Delete
    public void deleteContinent(Long id) {
        continentRepository.deleteById(id);
    }

}
