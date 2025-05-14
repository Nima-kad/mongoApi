import express from 'express';
import {
	createOnePokemon,
	getOnePokemonPage,
    getOnePokemonById,
	deleteOnePokemonById,
    updateOnePokemonById,
	getPokemonsFiltered,
} from '../controllers/pokemonController.js';

const router = express.Router();

router.post('/', createOnePokemon);               
router.get('/', getOnePokemonPage);               
router.get('/filter',getPokemonsFiltered )
router.get('/:id', getOnePokemonById);    
router.put('/:id', updateOnePokemonById);
router.delete('/:id', deleteOnePokemonById);

export default router;
