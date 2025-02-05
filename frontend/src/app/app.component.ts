import { Component,OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { KeycloakService } from './services/keycloak.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'identif';

  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.keycloakService.init().then((authenticated) => {
        console.log('✅ Keycloak Initialized:', authenticated);
      }).catch((error) => {
        console.error('❌ Keycloak initialization failed', error);
      });
    }
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

  get isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  get username(): string {
    return this.keycloakService.getUsername();
  }


 
}
