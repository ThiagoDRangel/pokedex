import { pokemonTypeThemes } from '../objects/pokemon-type-themes';

export function getPokemonTypeTheme(name) {
  return pokemonTypeThemes
    .find(type => type.name === name) ?? pokemonTypeThemes
    .find(type => type.name === 'unknown');
}