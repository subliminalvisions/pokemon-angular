import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Pokemon } from './pokemon-list/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: Http) { }

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

        info.types.forEach((types) => {
          pokemon.types.push(types.type.name);
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
