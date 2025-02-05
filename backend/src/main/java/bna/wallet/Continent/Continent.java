package BNA.wallet.Continent;

import BNA.wallet.Country.Country;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
@Data
@Entity
public class Continent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "continent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BNA.wallet.Country.Country> countries;

    public Continent() {}


    public Continent(List<Country> countries, String name) {
        this.countries = countries;
        this.name = name;
    }


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setCountries( List<BNA.wallet.Country.Country>   countries) {
        this.countries = countries;
    }
    public List<BNA.wallet.Country.Country> getCountries() {
        return countries;
    }

}
