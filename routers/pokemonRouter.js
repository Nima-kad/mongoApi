import express from 'express';
import {
	createOnePokemon,
	getOnePokemonPage,
    getOnePokemonById,
	deleteOnePokemonById,
    updateOnePokemonById,
	getPokemonsFiltered,
	getPokemonsSortedByWeight,
	getPokemonsSortedByheight,
	getPokemonsWithoutEvolutionCtl,
	getPokemonsTopFrenchNameLengthCtl,
} from '../controllers/pokemonController.js';

const router = express.Router();

router.post('/', createOnePokemon);               
router.get('/', getOnePokemonPage);               
router.get('/filter',getPokemonsFiltered );
router.get('/top-weight', getPokemonsSortedByWeight);
router.get('/top-height', getPokemonsSortedByheight);
router.get('/without-evolution', getPokemonsWithoutEvolutionCtl);
router.get('/top-french-name-length', getPokemonsTopFrenchNameLengthCtl);
router.get('/:id', getOnePokemonById);    
router.put('/:id', updateOnePokemonById);
router.delete('/:id', deleteOnePokemonById);

export default router;
