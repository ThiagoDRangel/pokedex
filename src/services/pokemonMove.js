export async function getPokemonMove(url) {
  const response = await fetch(url);
  return await response.json();
}
