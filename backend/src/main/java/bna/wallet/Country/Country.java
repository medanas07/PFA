package BNA.wallet.Country;

import BNA.wallet.Continent.Continent;
import BNA.wallet.Currency.Currency;
import jakarta.persistence.*;

@Entity
@Table
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String countryName;
    private String isoCode;
    private int m49Code;
    private double longitude;
    private double latitude;
    private double altitude;
    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;
    @ManyToOne
    @JoinColumn(name = "continent_id")
    private Continent continent;

    public Country() {
    }

    public Country(double altitude, int m49Code, double longitude, double latitude, String isoCode, Currency currency, String countryName, Continent continent) {
        this.altitude = altitude;
        this.m49Code = m49Code;
        this.longitude = longitude;
        this.latitude = latitude;
        this.isoCode = isoCode;
        this.currency = currency;
        this.countryName = countryName;
        this.continent = continent;
    }

    public double getAltitude() {
        return altitude;
    }

    public void setAltitude(double altitude) {
        this.altitude = altitude;
    }

    public int getM49Code() {
        return m49Code;
    }

    public void setM49Code(int m49Code) {
        this.m49Code = m49Code;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public Continent getContinent() {
        return continent;
    }

    public void setContinent(Continent continent) {
        this.continent = continent;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

}
