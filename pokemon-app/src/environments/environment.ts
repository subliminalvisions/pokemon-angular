// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
    pokemonList: 'https://pokeapi.co/api/v2/pokedex/2/',
    JohtopokemonList: 'https://pokeapi.co/api/v2/pokedex/3/',
    HoennpokemonList: 'https://pokeapi.co/api/v2/pokedex/4/',
    SinnohpokemonList: 'https://pokeapi.co/api/v2/pokedex/5/',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
    pokemon: 'https://pokeapi.co/api/v2/pokemon/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
