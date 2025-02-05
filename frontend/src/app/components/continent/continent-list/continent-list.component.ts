import { Component, OnInit } from '@angular/core';
import { ContinentService } from '../../../services/continent.service';
import { Continent } from '../../../models/continent.model';
import { NgFor } from '@angular/common';
import { HomeComponent } from '../../../home/home.component';
import { KeycloakService } from '../../../services/keycloak.service';  // Import Keycloak service

@Component({
  selector: 'app-continent-list',
  templateUrl: './continent-list.component.html',
  styleUrls: ['./continent-list.component.css'],
  imports : [NgFor, HomeComponent]
})
export class ContinentListComponent implements OnInit {
  continents: Continent[] = [];

  constructor(
    private continentService: ContinentService,
    private keycloakService: KeycloakService  // Inject Keycloak service
  ) {}

  ngOnInit(): void {
    // Check if the user is authenticated
    if (this.keycloakService.isAuthenticated()) {
      this.continentService.getContinents().subscribe(
        (data) => {
          this.continents = data;
        },
        (error) => {
          console.error('Error fetching continents:', error);
        }
      );
    } else {
      console.log('User is not authenticated');
    }
  }
}
