const path = require('path');
const fs = require('fs').promises;

const { newRecipe, getRecipe, getRecipeById, 
  editarRecipe, deletarRecipe } = require('../services/recipes.service');

const { editRecipeWithUrl } = require('../models/recipes.model');

  const {
    memoryUpload,
  } = require('../middlewares/upload');

const addRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  const result = await newRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

const listRecipes = async (req, res) => {  
  const result = await getRecipe();
  return res.status(200).json(result);
};

const listById = async (req, res) => {  
  const { id } = req.params;
  const { result } = await getRecipeById(id);
  if (!result) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const result = await editarRecipe(id, name, ingredients, preparation);
  return res.status(200).json({ ...result, userId });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await deletarRecipe(id);
  return res.status(204).json(result);
};

const uploadPicture = [
  memoryUpload.single('file'),
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { result, result: { _id } } = await getRecipeById(id);
    const { file: { buffer } } = req;
    const filePath = path.join(__dirname, '..', 'uploads', `${_id}.jpg`);
    await fs.writeFile(filePath, buffer);

    const newSaleEdited = { ...result, image: `localhost:3000/src/uploads/${_id}.jpg` };

    const editedRecipe = await editRecipeWithUrl(newSaleEdited);
    res.status(200).json(editedRecipe);
  },
];

module.exports = { addRecipes,
listRecipes,
listById,
editRecipe,
deleteRecipe,
uploadPicture };