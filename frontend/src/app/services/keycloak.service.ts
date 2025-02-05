import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import Keycloak from 'keycloak-js';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: Keycloak | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8180', // Keycloak server URL
        realm: 'bna',                // Realm name
        clientId: 'bna-client',      // Client ID
      });
    }
  }

  // Initialize Keycloak authentication
  async init(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('⏩ Skipping Keycloak initialization: Running in a non-browser environment.');
      return false;
    }

    if (!this.keycloak) {
      console.error('❌ Keycloak is not initialized.');
      return false;
    }

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      });
      console.log('✅ Keycloak Authenticated:', authenticated);
      return authenticated;
    } catch (error) {
      console.error('❌ Failed to initialize Keycloak', error);
      return false;
    }
  }

  login(): void {
    this.keycloak?.login();
  }

  logout(): void {
    this.keycloak?.logout();
  }

  isAuthenticated(): boolean {
    return this.keycloak?.authenticated ?? false;
  }

  getUsername(): string {
    return this.keycloak?.tokenParsed?.['preferred_username'] || '';
  }

  getKeycloakToken(): string | null {
    return this.keycloak?.token ?? null;
  }
}
