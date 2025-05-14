import { getAverageHp, getTopTypes } from '../models/pokemonsModel.js';

 const getAverageHpController = async (req, res) => {
  const result = await getAverageHp();
  
  if (result?.error) return res.status(500).json({ error: true, message: result.message });
  res.json(result);
};

 const getTopTypesController = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const types = await getTopTypes(limit);

  if (types?.error) return res.status(500).json({ error: true, message: types.message });
  res.json(types);
};
export { getAverageHpController, 
	getTopTypesController}