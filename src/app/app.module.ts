import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CatchMeButtonComponent } from './pokemon-list/catch-me-button/catch-me-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    LandingPageComponent,
    TrainerPageComponent,
    NavbarComponent,
    CatchMeButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
