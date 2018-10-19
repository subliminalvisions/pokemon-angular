import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PokemonService } from './pokemon.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { UiModule } from './ui/ui.module';
import { PokemonComponent } from './pokemon/pokemon.component';
import { FavoritePokemonService } from './favorite-pokemon.service';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    UiModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [PokemonService, FavoritePokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
