import fetch from 'node-fetch';

const MAX_POKEMON_ID = 898;

// Obtiene los datos básicos de un Pokémon por ID desde pokeapi.co
 
async function fetchPokemonById(id) {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!resp.ok) throw new Error('Error fetching from PokeAPI');
  const data = await resp.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map(t => t.type.name),
  };
}

//Genera un ID aleatorio entre 1 y MAX_POKEMON_ID

function getRandomPokemonId() {
  return Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
}

export{fetchPokemonById, getRandomPokemonId};