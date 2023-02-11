import { baseUrl } from '../variables';

export async function getPokemonTypeList() {
  const response = await fetch(`${baseUrl}/type`);
  return await response.json();
}

export async function getPokemonDetails(url) {
  const response = await fetch(url);
  return await response.json();
}
