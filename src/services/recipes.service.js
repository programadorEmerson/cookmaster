const { newRecipeModel, getAllRecipes, getById, 
  editRecipe, deleteRecipe } = require('../models/recipes.model');

const newRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await newRecipeModel(name, ingredients, preparation, userId);
  return recipe;
};

const getRecipe = async () => {
  const recipe = await getAllRecipes();
  return recipe;
};

const getRecipeById = async (id) => {
  const recipe = await getById(id);
  return recipe;
};

const editarRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await editRecipe(id, name, ingredients, preparation);
  return recipe;
};

const deletarRecipe = async (id) => {
  const recipe = await deleteRecipe(id);
  return recipe;
};

module.exports = { newRecipe,
getRecipe,
getRecipeById,
editarRecipe,
deletarRecipe };