import { Router } from 'express';
import { generatePokemon, guessPokemon, listAttempts } from '../controllers/pokemonController.js';

const router = Router();

router.get('/generatePokemon', generatePokemon);
router.get('/guess/:name', guessPokemon);
router.get('/pokemon/intentos', listAttempts);

export default router;
