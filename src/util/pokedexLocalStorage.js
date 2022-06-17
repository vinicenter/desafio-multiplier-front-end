function isPokemonAlreadyInLocalStorage(pokemonList, id) {
  for (let i = 0; i < pokemonList.length; i += 1) {
    if (pokemonList[i] === id) return true;
  }

  return false;
}

export function getPokemonList() {
  let pokemonList = localStorage.getItem('pokemonList');
  if (pokemonList == null || pokemonList === undefined) pokemonList = '';

  pokemonList = pokemonList.split(',');
  if (pokemonList[0] === '') pokemonList.shift();
  if (!(pokemonList.length > 0)) pokemonList = [];

  return pokemonList;
}

export function removePokemon(pokemon) {
  const pokemonList = getPokemonList();

  if (isPokemonAlreadyInLocalStorage(pokemonList, pokemon)) {
    for (let i = 0; i < pokemonList.length; i += 1) {
      if (pokemonList[i] === pokemon) {
        pokemonList.splice(i, 1);
      }
    }
  }

  localStorage.setItem('pokemonList', pokemonList.toString());
}

export function addPokemonToLocalStorage(id) {
  const pokemonList = getPokemonList();

  if (isPokemonAlreadyInLocalStorage(pokemonList, id)) return false;

  pokemonList.push(id);

  localStorage.setItem('pokemonList', pokemonList.toString());
  return true;
}

export function getPokemonsCount() {
  const pokemonList = getPokemonList();
  return pokemonList.length;
}

export function isPokedexEmpty() {
  return getPokemonsCount() === 0;
}
