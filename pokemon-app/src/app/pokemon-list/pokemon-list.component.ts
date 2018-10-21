import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from './pokemon';
import { FavoritePokemonService } from '../favorite-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  /* All pokemons since page feature is broken */
  pokemonList: Pokemon[] = [];
  /* Pokemons to show, used since feature page is broken */
  pokemonGrid: Pokemon[] = [];

  isLoading: Boolean = true;

  pages: Array<Object> = [];

  error: Boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private favoritePokemon: FavoritePokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList()
      .then((pokemon) => {
        this.pages = [];
        this.isLoading = false;

        const totalPages = Math.ceil(pokemon.length / 15);

        for (let index = 0; index < totalPages; index++) {
          this.pages.push({ index: index + 1 });
        }

        this.pokemonList = pokemon;

        this.updatePage({ index: 1 });
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }

  updatePage(page) {
    const pageStart = (page.index - 1) * 15;
    const pageEnd = page.index * 15;

    this.pokemonGrid = [];
    this.pokemonList.forEach(p => {
      if (p.id > pageStart && p.id <= pageEnd) {
        this.pokemonGrid.push(p);
      }
    });
  }

  onChange(event, pokemon) {
    if (event.target.checked) {
      this.favoritePokemon.add(pokemon.id);
      pokemon.isChecked = true;
    } else {
      this.favoritePokemon.remove(pokemon.id);
      pokemon.isChecked = false;

    }
  }

}
