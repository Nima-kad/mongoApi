import {
	getPokemon,
	getPokemonById,
	ajoutPokemon,
	updateOnePokemon,
	deleteOnePokemon,
	getPokemonsByFilter,
	getPokemonBySortedByWeight,
	getPokemonBySortedByHeight,
	getPokemonsWithoutEvolution,
	getPokemonsTopFrenchNameLength,
	getAverageHp,
} from '../models/pokemonsModel.js';

import removeBlankAttributes  from "../utils/removeBlankAttributes.js";

import { ObjectId } from 'mongodb';

const createOnePokemon = async (req, res) => {
	const pokemon = req.body;

	const status = await ajoutPokemon(pokemon);

	if (status?.error) {
		return res
			.status(500)
			.json({ error: true, message: "Le pokemon n'a pas été ajouté" });
	} else {
		res.json({
			message: 'Le pokemon a été ajouté',
			pokemon,
		});
	}
};

const getOnePokemonPage = async (req, res) => {
	const page = req.query.page;
	const tousLesPokemons = await getPokemon(page);
	res.json(tousLesPokemons);
};

const getOnePokemonById = async (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(400).json({ error: true, message: "ID invalide" });
	}

	const pokemon = await getPokemonById(id);

	if (pokemon?.error) {
		return res.status(500).json({ error: true, message: "Erreur lors de la récupération du Pokémon" });
	}

	if (!pokemon) {
		return res.status(404).json({ message: "Le Pokémon n'a pas été trouvé" });
	}

	res.json(pokemon);
};

const updateOnePokemonById = async (req, res) => {
	const id = req.params.id;

	const { name, type, base,species,description, evolution, profile, image } = req.body;
	const update = removeBlankAttributes({ name, type, base,species,description, evolution, profile, image });

	
	const status = await updateOnePokemon(id, update);

	if (status?.error) {
		return res.status(500).json({ error: true, message: "Le Pokémon n'a pas été modifié" });
	} else {
		res.json({ message: 'Le Pokémon a été modifié' });
	}
};

const deleteOnePokemonById = async (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(400).json({ error: true, message: "ID invalide" });
	}

	const status = await deleteOnePokemon(id);

	if (status?.error) {
		return res.status(500).json({ error: true, message: "Erreur lors de la suppression" });
	}

	if (status.deletedCount === 0) {
		return res.status(404).json({ message: "Le Pokémon n'a pas été trouvé" });
	}

	res.json({ message: 'Le Pokémon a été supprimé' });
};


const getPokemonsFiltered = async (req, res) => {
	const { type,startsWith,minTypes } = req.query;
	
	let filter = {};

	if (type) {
    filter.type = type;
	}

	if (startsWith) {
		filter['name.english'] = { $regex: `^${startsWith}`, $options: 'i' };
	}

	
	if (minTypes) filter[`type.${minTypes - 1}`] = { $exists: true };

	
	
	const pokemons = await getPokemonsByFilter(filter);

	res.json(pokemons);
};

const getPokemonsSortedByWeight = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) 

        const pokemons = await getPokemonBySortedByWeight(limit);

        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
const getPokemonsSortedByheight = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) 

        const pokemons = await getPokemonBySortedByHeight(limit);

        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

////
 const getPokemonsWithoutEvolutionCtl = async (req, res) => {
  const typesParam = req.query.types;

  if (!typesParam) {
    return res.status(400).json({ error: true, message: "Missing 'types' parameter" });
  }

  const typesArray = typesParam.split(',').map(type => type.trim());

  const pokemons = await getPokemonsWithoutEvolution(typesArray);

  if (pokemons?.error) {
    return res.status(500).json({ error: true, message: pokemons.message });
  }
  console.log(typesArray);

  res.json(pokemons);
};
///
const getPokemonsTopFrenchNameLengthCtl = async (req, res) => {
	const limit = parseInt(req.query.limit) 

  const pokemons = await getPokemonsTopFrenchNameLength(limit);

  if (pokemons?.error) {
    return res.status(500).json({ error: true, message: pokemons.message });
  }

  res.json(pokemons);
};

 const getAverageHpController = async (req, res) => {
  const result = await getAverageHp();

  if (result?.error) {
    return res.status(500).json({ error: true, message: result.message });
  }

  res.json(result);
};

export { createOnePokemon, 
	getOnePokemonPage,
	getOnePokemonById,
	updateOnePokemonById,
	deleteOnePokemonById,
	getPokemonsFiltered,
	getPokemonsSortedByWeight,
	getPokemonsSortedByheight,
	getPokemonsWithoutEvolutionCtl,
	getPokemonsTopFrenchNameLengthCtl,
	getAverageHpController}
