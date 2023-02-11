import { createContext } from 'react';
import { getPokemonDetailsByUrl, getPokemonList } from '../services/pokemon';
import { getPokemonTypeDetailsByUrl } from '../services/pokemonType';
import { maxItems } from '../helpers/variables';

export const pokemonsContext = createContext({});
this.state = {
  pokemons: [],
  nextLoadUrl: '',
  isFiltered: false,
}
export const pokemonsProvider = (props) => {
  const [pokemonList, setPokemonList] = this.setState({
    pokemons: [],
    nextLoadUrl: '',
    isFiltered: false,
  });

  const [reservedList, setReservedList] = this.setState([]);

  async function fetchList(url) {
    const pokemons = await getPokemonList(url);
    const pokemonsDetails = pokemons.results
      .map(async (pokemon) => {
        return await getPokemonDetailsByUrl(pokemon.url);
      });
      const pokemonDetailedList = await Promise.all(pokemonsDetails);
        return {
          detailedList: pokemonDetailedList,
          nextLoadUrl: pokemons.next,
        }
    }

    async function fetchData() {
      const pokemons = await fetchList();
      setPokemonList({
        pokemons: pokemons.detailedList,
        nextLoadUrl: pokemons.nextLoadUrl,
        isFiltered: false,
      });
    }

    async function fetchPokemonListDetails(pokemons) {
      const pokemonsDetails = pokemons.map(async (pokemon) => {
        return await getPokemonDetailsByUrl(pokemon.url);
      });
      const pokemonDetailedList = await Promise.all(pokemonsDetails);
      return pokemonDetailedList;
    }

    async function filterPokemonListByType(typeUrl) {
      const pokemonTypeDetails = await getPokemonTypeDetailsByUrl(typeUrl);
      let pokemonList = [{
        name: '',
        url: '',
        pokemons: [],
      }];
      pokemonList = pokemonTypeDetails.pokemon
        .map((poke) => poke.pokemon);
      const pokemonDetailedList = await fetchPokemonListDetails(pokemonList);
      const splicedPokemonList = pokemonDetailedList.splice(0, maxItems);

      setReservedList(pokemonDetailedList);
      setPokemonList({
        pokemons: splicedPokemonList,
        nextLoadUrl: '',
        isFiltered: true,
      });
    }

  return (
    <pokemonsContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        fetchList,
        fetchData,
        reservedList,
        setReservedList,
        filterPokemonListByType,
        }}
    >
      {props.children}
    </pokemonsContext.Provider>
    );
}