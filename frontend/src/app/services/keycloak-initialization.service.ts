import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitializationService {
  constructor(private keycloakService: KeycloakService) {}

  async initializeKeycloak(): Promise<boolean> {
    return this.keycloakService.init();
  }
}
