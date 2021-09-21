const { newUser, requestLogin } = require('../models/usuarios.model');

const create = async ({ email, name, password }) => {
  const newProducts = await newUser({ email, name, password });
  return newProducts;
};

const login = async ({ email, password }) => {
  const user = await requestLogin({ email, password });
  return user;
};

module.exports = { create, login };