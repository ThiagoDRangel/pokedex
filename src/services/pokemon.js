import { baseUrl, maxItems } from '../helpers/variables';

export async function getPokemonList(
  url = `${baseUrl}/pokemon/?limit=${maxItems}&offset=0`) {
    const response = await fetch(url);
    return await response.json();
}

export async function getPokemonDetailsUrl(url) {
  const response = await fetch(url);
  return await response.json();
}

export async function getPokemonDetailsId(id) {
  const response = await fetch(`${baseUrl}/pokemon/${id}`);
  return await response.json();
}


