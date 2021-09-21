const { ObjectId } = require('mongodb');
const connection = require('../models/mongoConnection');

const message = 'Invalid entries. Try again.';
const messageToErrorLogin = 'All fields must be filled';

const verifyEmail = (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email 
      || !email.includes('@') || !email.includes('.com')) {
      return response.status(400).json({ message });
    }
    next();
  } catch (error) {
    return response.status(400).json({ message });
  }
};

const verifyName = (request, response, next) => {
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ message });
    }
    next();
  } catch (error) {
    return response.status(400).json({ message });
  }
};

const enableModifications = async (request, response, next) => {
  try {
    const { userId } = request.user;
    const db = await connection();
    const { role } = await db.collection('users').findOne({ _id: ObjectId(userId) });  

    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(request.params.id) });
    
    if (role === 'user' && recipe.userId !== userId) {
      return response.status(401).json({ message: 'missing auth token' });
    } 
    next();
  } catch (error) {
    return response.status(401).json({ message: 'missing auth token' });
  } 
};

const verifyPassword = (request, response, next) => {
  try {
    const { password } = request.body;
    if (!password) {
      return response.status(409).json({ message });
    }
    next();
  } catch (error) {
    return response.status(409).json({ message });
  }
};

const userExists = async (request, response, next) => {
  const { email } = request.body;
  const db = await connection();   
  const user = await db.collection('users').findOne({ email });
  if (user) { return response.status(409).json({ message: 'Email already registered' }); }    
  next();
};

const verifyEmailToLogin = (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email 
      || !email.includes('@') || !email.includes('.com')) {
        return response.status(401).json({ message: messageToErrorLogin });
      }
      next();
    } catch (error) {
      return response.status(401).json({ message: messageToErrorLogin });
    }
};

const verifyPasswordToLogin = (request, response, next) => {
  try {
    const { password } = request.body;
    if (!password) {
      return response.status(401).json({ message: messageToErrorLogin });
    }
    next();
  } catch (error) {
    return response.status(401).json({ message: messageToErrorLogin });
  }
};

module.exports = { userExists,
verifyPassword,
verifyName, 
verifyEmail,
verifyEmailToLogin,
verifyPasswordToLogin,
enableModifications };