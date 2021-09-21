const jwt = require('jsonwebtoken');
const connection = require('./mongoConnection');

const SECRET = 'paranguaricutirimiruarum';

const newUser = async ({ email, name, password }) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  const { insertedId } = JSON.parse(user);
  return { user: { _id: insertedId, name, email, role: 'user' } };
};

const login = async ({ email, password }) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email, password });
  return user;
};

const requestLogin = async ({ email, password }) => {
  const usuario = await login({ email, password });
  if (!usuario) return { message: 'Incorrect username or password' };  
  const { _id } = usuario;

  const newToken = jwt.sign(
    {
      userId: _id,
      email,
    },
    SECRET,
    {
      expiresIn: 1440,
    },
  );

  return { token: newToken };
};

module.exports = { newUser, requestLogin };