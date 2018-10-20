import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon-list/pokemon';
import { ActivatedRoute } from '@angular/router';
import { FavoritePokemonService} from '../favorite-pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon = new Pokemon();
  isChecked = false;
  isLoading = true;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private favoritePokemon: FavoritePokemonService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.pokemonService.getPokemonInfo(id)
      .then((pokemon) => { 
        this.pokemon = pokemon; 
        this.isLoading = false;
      });
  }

  onChange(event, pokemon) {
    if (event.target.checked) {
        this.favoritePokemon.add(pokemon.id);
        this.isChecked = event.target.checked;
    } else {
        this.favoritePokemon.remove(pokemon.id);
    }
}

}
