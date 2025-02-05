import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { routes } from './app-routing.module'
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DatePipe } from '@angular/common';
import { WalletService } from './services/wallet.service';
import { KeycloakInitializationService } from './services/keycloak-initialization.service';
import { KeycloakService } from './services/keycloak.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [HttpClientModule,
    ReactiveFormsModule,BrowserModule, FormsModule,RouterModule.forRoot(routes)],
  providers: [provideRouter(routes),provideHttpClient(),DatePipe,WalletService
    ,KeycloakService,KeycloakInitializationService,
    {
      provide: 'APP_INITIALIZER',
      useFactory: (initService: KeycloakInitializationService) => {
        return () => initService.initializeKeycloak();
      },
      deps: [KeycloakInitializationService],
      multi: true,
    },
    
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
