import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country.service'; // Import du service
import { Country } from '../../../models/country.model';
import { CommonModule } from '@angular/common';
import { Currency } from '../../../models/currency.model';
import { Continent } from '../../../models/continent.model';
import { HomeComponent } from '../../../home/home.component';
import { KeycloakService } from '../../../services/keycloak.service';
@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css'],
  imports:[CommonModule,FormsModule,ReactiveFormsModule,HomeComponent]
})
export class CountryFormComponent implements OnInit {
  countryForm!: FormGroup;
  currencies: Currency[] = [];
  continents: Continent[] = [];

  constructor(private fb: FormBuilder, private countryService: CountryService,private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    if (this.keycloakService.isAuthenticated()) {
      this.countryForm = this.fb.group({
        countryName: ['', Validators.required],
        isoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
        m49Code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        altitude: ['', Validators.required],
        currency: ['', Validators.required],
        continent: ['', Validators.required]
      });

      this.loadCurrencies();
      this.loadContinents();
    } else {
      console.log('User is not authenticated');
    }
  }

  loadCurrencies(): void {
    this.countryService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  loadContinents(): void {
    this.countryService.getContinents().subscribe(continents => {
      this.continents = continents;
    });
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      const countryData: Country = this.countryForm.value;
      console.log('Payload envoyé :', JSON.stringify(countryData));
      this.countryService.createCountry(countryData).subscribe({
        next: (response) => {
          console.log('Pays ajouté avec succès:', response);
          this.countryForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout du pays:', error);
        }
      });
    }
  }
}

