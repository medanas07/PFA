import { TestBed } from '@angular/core/testing';

import { KeycloakInitializationService } from './keycloak-initialization.service';

describe('KeycloakInitializationService', () => {
  let service: KeycloakInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakInitializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
