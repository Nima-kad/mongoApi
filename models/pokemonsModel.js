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


export { getPokemon,getPokemonById, ajoutPokemon,updateOnePokemon,deleteOnePokemon,getPokemonsByFilter };
