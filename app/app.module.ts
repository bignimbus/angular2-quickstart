import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeroService } from './hero.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';

import { routing } from './app.routing';

@NgModule({
  imports: [BrowserModule, FormsModule, routing],
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
