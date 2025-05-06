import { fetchPokemonById, getRandomPokemonId } from '../services/pokemonService.js';
import { addAttempt, getAllAttempts } from '../services/storageService.js';

let currentPokemon = null;

//GET /generatePokemon

 async function generatePokemon(req, res) {
  try {
    const id = getRandomPokemonId();
    const pokemon = await fetchPokemonById(id);
    currentPokemon = pokemon;
    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo obtener el Pokémon' });
  }
}

//GET /guess/:name
 async function guessPokemon(req, res) {
  if (!currentPokemon) {
    return res.status(400).json({ error: 'No se ha generado ningún Pokémon aún.' });
  }
  const guess = req.params.name.toLowerCase();
  const correct = guess === currentPokemon.name.toLowerCase();
  const attempt = {
    time: new Date().toISOString(),
    guess,
    actual: currentPokemon.name,
    correct,
  };
  await addAttempt(attempt);
  res.json({ correct, actual: currentPokemon.name });
}

//GET /pokemon/intentos
 async function listAttempts(req, res) {
  const attempts = await getAllAttempts();
  res.json(attempts);
}

export {generatePokemon, guessPokemon, listAttempts};
