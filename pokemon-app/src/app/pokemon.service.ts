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
    return this.http.get(environment.urls.pokemon, this.getHeaders())
      .toPromise()
      .then((res: Response) => {
        let data = res.json();
        let pokemonList = [];
        data.pokemon_entries.forEach((entry) => {
          let pokemon = new Pokemon();
          pokemon.name = entry.pokemon_species.name;
          pokemon.id = entry.entry_number;
          pokemonList.push(pokemon);
        });
        return pokemonList;

      });
  }
}
