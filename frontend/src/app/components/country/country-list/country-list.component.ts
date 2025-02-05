import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../../home/home.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  imports:[CommonModule,FormsModule,HomeComponent]
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private countryService: CountryService, private router: Router) {}


  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Erreur lors du chargement des pays.";
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  deleteCountry(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce pays ?")) {
      this.countryService.deleteCountry(id).subscribe({
        next: () => {
          this.countries = this.countries.filter(country => country.id !== id);
        },
        error: (error) => {
          console.error("Erreur lors de la suppression", error);
        }
      });
    }
  }

  editCountry(id: number): void {
    this.router.navigate(['/countries/edit', id]); // Redirige vers la page d'édition
  }
}
