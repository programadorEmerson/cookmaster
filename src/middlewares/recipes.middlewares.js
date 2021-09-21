const JWT = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Joi = require('joi');
const connection = require('../models/mongoConnection');

const SECRET = 'paranguaricutirimiruarum';

const validaToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = JWT.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });    
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const db = await connection();
    const result = await db.collection('recipes').findOne(ObjectId(req.params.id));
    if (!result) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    next();
  } catch (error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const validaRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = { validaToken, validaRecipe, getRecipeById };