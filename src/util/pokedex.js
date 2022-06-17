export function getPokemonList() {
  let pokemonList = localStorage.getItem('pokemonList');
  if (pokemonList == null) pokemonList = '';

  return pokemonList;
}

export function removePokemon(pokemon) {
  let pokemonList = getPokemonList();
  pokemonList = pokemonList.replace(`${pokemon}, `, '');
  pokemonList = pokemonList.replace(`, ${pokemon}`, '');
  pokemonList = pokemonList.replace(pokemon, '');
  localStorage.setItem('pokemonList', pokemonList);
}

export function addPokemonToLocalStorage(id) {
  let pokemonList = getPokemonList();

  if (pokemonList.match(id)) return false;

  if (!(pokemonList === '')) pokemonList += `, ${id}`;
  else pokemonList = id;

  localStorage.setItem('pokemonList', pokemonList);
  return true;
}

export function getPokemonsCount() {
  const pokemonList = getPokemonList();
  if (pokemonList === '') return 0;
  const pokemonListArray = pokemonList.split(', ');
  return pokemonListArray.length;
}
