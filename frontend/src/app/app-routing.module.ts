import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContinentDetailComponent } from './components/continent/continent-detail/continent-detail.component';
import { ContinentFormComponent } from './components/continent/continent-form/continent-form.component';
import { ContinentListComponent } from './components/continent/continent-list/continent-list.component';
import { CurrencyListComponent } from './components/currency/currency-list/currency-list.component';
import { CurrencyFormComponent } from './components/currency/currency-form/currency-form.component';
import {CountryListComponent}from'./components/country/country-list/country-list.component';
import {WalletFormComponent} from './components/wallet-form/wallet-form.component'
import {WalletTransactionComponent} from './components/wallet-transaction/wallet-transaction.component'
import { WalletListComponent } from './components/wallet-list/wallet-list.component';
import { WalletUpdateComponent } from './components/wallet-update/wallet-update.component';
import { CountryFormComponent } from './components/country/country-form/country-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { KeycloakAuthGuard } from './keycloak-auth-guard/keycloak-auth-guard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path : 'home' , component : HomeComponent},

  { path: 'Create-New-Wallet', component:  WalletFormComponent, canActivate: [KeycloakAuthGuard]},
  {path: 'wallets', component : WalletListComponent , canActivate: [KeycloakAuthGuard]},
  
  { path: 'wallets/update/:userId', component: WalletUpdateComponent, canActivate: [KeycloakAuthGuard] },

  { path: 'wallet-transactions', component: WalletTransactionComponent, canActivate: [KeycloakAuthGuard] },

  { path: 'continents', component: ContinentListComponent , canActivate: [KeycloakAuthGuard]},
  { path: 'continents/create', component: ContinentFormComponent, canActivate: [KeycloakAuthGuard] },
  { path: 'continents/:id', component: ContinentDetailComponent , canActivate: [KeycloakAuthGuard]},

  { path: 'countries', component: CountryListComponent, canActivate: [KeycloakAuthGuard] },
  { path: 'countries/create', component: CountryFormComponent, canActivate: [KeycloakAuthGuard]},

  { path: 'currencies', component: CurrencyListComponent , canActivate: [KeycloakAuthGuard]},
  { path: 'currencies/new', component: CurrencyFormComponent, canActivate: [KeycloakAuthGuard] }, 

  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}
