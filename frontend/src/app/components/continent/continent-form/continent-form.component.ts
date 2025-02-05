import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ContinentService } from '../../../services/continent.service';
import { Continent } from '../../../models/continent.model';
import { HomeComponent } from '../../../home/home.component';
import { KeycloakService } from '../../../services/keycloak.service';  // Import Keycloak service

@Component({
  selector: 'app-continent-form',
  templateUrl: './continent-form.component.html',
  styleUrls: ['./continent-form.component.css'],
  imports : [ReactiveFormsModule, HomeComponent]
})
export class ContinentFormComponent implements OnInit {
  continentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private continentService: ContinentService,
    private keycloakService: KeycloakService  // Inject Keycloak service
  ) {
    this.continentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Submit the form to create a new continent
  onSubmit(): void {
    if (this.continentForm.valid) {
      const newContinent: Continent = this.continentForm.value;
      this.continentService.createContinent(newContinent).subscribe(response => {
        console.log('Continent created:', response);
      });
    }
  }
}
