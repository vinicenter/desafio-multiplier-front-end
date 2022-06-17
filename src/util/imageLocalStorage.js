export function getPokemonImageOnLocalStorage(id) {
  const image = localStorage.getItem(`pokemonImage${id}`);

  if (image == null) {
    return '';
  }

  return image;
}

export function removePokemonImageFromLocalStorage(id) {
  localStorage.removeItem(`pokemonImage${id}`);
}

export function addPokemonImageToLocalStorage(id, image) {
  localStorage.setItem(`pokemonImage${id}`, image);
}
