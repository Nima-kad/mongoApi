import express from 'express';
import {
	createOnePokemon,
	getOnePokemonPage,
    getOnePokemonById,
	deleteOnePokemonById,
    updateOnePokemonById,
	getPokemonsFiltered,
<<<<<<< HEAD
	getPokemonsSortedByWeight,
	getPokemonsSortedByheight,
=======
>>>>>>> 9920701f692e636ca0eb7f0ab284280e13eba9ee
} from '../controllers/pokemonController.js';

const router = express.Router();

router.post('/', createOnePokemon);               
router.get('/', getOnePokemonPage);               
<<<<<<< HEAD
router.get('/filter',getPokemonsFiltered );
router.get('/top-weight', getPokemonsSortedByWeight);
router.get('/top-height', getPokemonsSortedByheight);
=======
router.get('/filter',getPokemonsFiltered )
>>>>>>> 9920701f692e636ca0eb7f0ab284280e13eba9ee
router.get('/:id', getOnePokemonById);    
router.put('/:id', updateOnePokemonById);
router.delete('/:id', deleteOnePokemonById);

export default router;
