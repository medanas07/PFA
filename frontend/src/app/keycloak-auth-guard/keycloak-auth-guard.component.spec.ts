import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycloakAuthGuardComponent } from './keycloak-auth-guard.component';

describe('KeycloakAuthGuardComponent', () => {
  let component: KeycloakAuthGuardComponent;
  let fixture: ComponentFixture<KeycloakAuthGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycloakAuthGuardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeycloakAuthGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
