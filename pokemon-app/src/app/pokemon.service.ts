import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Pokemon } from './pokemon-list/pokemon';
import { FavoritePokemonService } from './favorite-pokemon.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: Http,
    private favoritePokemon: FavoritePokemonService) { }

  protected getHeaders() {
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    return { headers: requestHeaders };
  }

  getPokemonList() {
    return this.http.get(environment.urls.pokemonList, this.getHeaders())
      .toPromise()
      .then((res: Response) => {
        let info = res.json();
        let pokemonList = [];
        info.pokemon_entries.forEach((entry) => {
          let pokemon = new Pokemon();
          pokemon.name = entry.pokemon_species.name;
          pokemon.id = entry.entry_number;
          pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
          pokemonList.push(pokemon);
        });
        return pokemonList;

      });
  }

  getPokemonInfo(id: number) {
    return this.http.get(environment.urls.pokemon + id + '/', this.getHeaders())
      .toPromise()
      .then((res: Response) => {
        let info = res.json();
        let pokemon = new Pokemon();
        pokemon.name = info.name;
        pokemon.id = info.id;
        pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
        
        info.types.forEach((type) => {
          pokemon.types.push(type.type.name);
        });

        info.stats.forEach((stats) => {
          pokemon.stats.push({
            name: stats.stat.name,
            value: stats.base_stat
          });
        });

        return pokemon;
      });
  }
}
