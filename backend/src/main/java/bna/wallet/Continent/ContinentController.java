package BNA.wallet.Continent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/continents")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContinentController {
    @Autowired
    public ContinentController(ContinentService continentService) {
        this.continentService = continentService;
    }

    private ContinentService continentService;

    // Create
    @PostMapping
    public ResponseEntity<Continent> createContinent(@RequestBody Continent continent1) {
        Continent createdContinent = continentService.createContinent(continent1);
        return ResponseEntity.ok(createdContinent);
    }

    // Read (Get All)
    @GetMapping
    public ResponseEntity<List<Continent>> getAllContinents() {
        List<Continent> continents = continentService.getAllContinents();
        return ResponseEntity.ok(continents);
    }

    // Read (Get By ID)
    @GetMapping("/{id}")
    public ResponseEntity<Continent> getContinentById(@PathVariable Long id) {
        return continentService.getContinentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Continent> updateContinent(@PathVariable Long id, @RequestBody Continent continentDetails) {
        Continent updatedContinent = continentService.updateContinent(id, continentDetails);
        return ResponseEntity.ok(updatedContinent);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContinent(@PathVariable Long id) {
        continentService.deleteContinent(id);
        return ResponseEntity.noContent().build();
    }
}
