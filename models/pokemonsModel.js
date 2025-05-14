import connectToMongoDB from '../db/mongo.js';
import { ObjectId } from 'mongodb';

 async function getPokemon(page = 1) {
	let mongoClient;
	let tousLesPokemons;
	const numbToSkip = page - 1;
	const numbToLimit = 30;

	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const pokemons = m2iDb.collection('pokemons');
		tousLesPokemons = await pokemons
			.find()
			.skip(numbToLimit * numbToSkip)
			.limit(numbToLimit)
			.toArray();
	} finally {
		mongoClient.close();
	}

	return tousLesPokemons;
}


async function getPokemonById(id) {
	let mongoClient;
	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const pokemons = m2iDb.collection('pokemons');

		const pokemon = await pokemons.findOne(	{ _id: ObjectId.createFromHexString(id) },
);

		return pokemon;
	} catch (error) {
		return { error: true };
	} finally {
		mongoClient.close();
	}
}

 async function ajoutPokemon(pokemon) {
	let mongoClient;
	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const pokemons = m2iDb.collection('pokemons');
		await pokemons.insertOne(pokemon);
	} catch (error) {
		return { error: true };
	} finally {
		mongoClient.close();
	}
}


async function updateOnePokemon(id, data) {
	let mongoClient;
	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const Pokemons = m2iDb.collection('pokemons');

		const updateStatus = await Pokemons.updateOne(
			{ _id: ObjectId.createFromHexString(id) },
			{ $set: data }
		);
		console.log(updateStatus);
	} catch (error) {
		console.log(error);

		return { error: true };
	} finally {
		mongoClient.close();
	}
}

async function deleteOnePokemon(id) {
	let mongoClient;
	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const pokemons = m2iDb.collection('pokemons');

		const status = await pokemons.deleteOne({
			_id: ObjectId.createFromHexString(id),
		});
		return status;
	} catch (error) {
		console.log(error);

		return { error: true };
	} finally {
		mongoClient.close();
	}
}

async function getPokemonsByFilter(filter = {}) {
	let mongoClient;
	try {
		mongoClient = await connectToMongoDB(process.env.DB_URI);
		const m2iDb = mongoClient.db('media');
		const pokemons = m2iDb.collection('pokemons');

		const result = await pokemons.find(filter).toArray();
        
		return result;
	} catch (error) {
		return { error };
	} finally {
		mongoClient.close();
	}
}
async function getPokemonBySortedByWeight(limit) {


	let mongoClient;
	try {
	mongoClient = await connectToMongoDB(process.env.DB_URI);
	const m2iDb = mongoClient.db('media');
	const pokemons = m2iDb.collection('pokemons');

	const pokemon = await pokemons.aggregate([
		{ $sort: { 'profile.weight': -1 } },
		{ $limit: limit },
		{
			$project: {
				_id: 0,
				"name.french": 1,
				'profile.weight': -1 
			  }
		  }
	]);

	const pokemonArray = await pokemon.toArray();


	return pokemonArray;

	 } catch (error) {
-	res.status(500).json({ message: 'Erreur serveur', error: error.message });
}

}



async function getPokemonBySortedByHeight(limit) {


	let mongoClient;
	try {
	mongoClient = await connectToMongoDB(process.env.DB_URI);
	const m2iDb = mongoClient.db('media');
	const pokemons = m2iDb.collection('pokemons');

	const pokemon = await pokemons.aggregate([
		{ $sort: { 'profile.height': -1 } },
		{ $limit: limit },
		{
			$project: {
				_id: 0,
				"name.french": 1,
				'profile.height': -1 
			  }
		  }
		
	]);

	const pokemonArray = await pokemon.toArray();


	return pokemonArray;

	 } catch (error) {
-	res.status(500).json({ message: 'Erreur serveur', error: error.message });
}
}

async function getPokemonsWithoutEvolution(typesArray) {
  let mongoClient;
  try {
    mongoClient = await connectToMongoDB(process.env.DB_URI);
    const db = mongoClient.db('media');
    const pokemons = db.collection('pokemons');

    const result = await pokemons.find({
      type: { $in: typesArray }, 
	  evolution: {} 
      
    }).toArray();

    return result;

  } catch (error) {
    return { error: true, message: error.message };
  } finally {
    mongoClient.close();
  }
}

 async function getPokemonsTopFrenchNameLength(limit) {
  let mongoClient;
  try {
    mongoClient = await connectToMongoDB(process.env.DB_URI);
    const db = mongoClient.db('media');
    const pokemons = db.collection('pokemons');

    const result = await pokemons.aggregate([
      {
        $addFields: {
          nameLength: { $strLenCP: "$name.french" }
        }
      },
      { $sort: { nameLength: -1 } },
      { $limit: limit },
      {
        $project: {
			_id: 0,
			"name.french": 1,
			nameLength: 1
		  }
      }
    ]).toArray();

    return result;

  } catch (error) {
    return { error: true, message: error.message };
  } finally {
    mongoClient.close();
  }
}


 async function getAverageHp() {
  let mongoClient;
  try {
    mongoClient = await connectToMongoDB(process.env.DB_URI);
    const db = mongoClient.db('media');
    const pokemons = db.collection('pokemons');

    const result = await pokemons.aggregate([
      {
        $group: {
          _id: null,
          moyenneHP: { $avg: "$base.HP" }
        }
      },
      {
        $project: {
          _id: 0,
          moyenneHP: 1
        }
      }
    ]).toArray();

    return result[0]; 

  } catch (error) {
    return { error: true, message: error.message };
  } finally {
    mongoClient.close();
  }
}


 async function getTopTypes(limit) {
  let mongoClient;
  try {
    mongoClient = await connectToMongoDB(process.env.DB_URI);
    const db = mongoClient.db('media');
    const pokemons = db.collection('pokemons');

    const result = await pokemons.aggregate([
      { $unwind: "$type" },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { _id: 0, type: "$_id", count: 1 } }
    ]).toArray();

    return result;

  } catch (error) {
    return { error: true, message: error.message };
  } finally {
    mongoClient.close();
  }
}


export { getPokemon,
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
	getTopTypes };
