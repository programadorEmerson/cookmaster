const { create, login } = require('../services/usuarios.service');

const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await create({ email, name, password });
  return res.status(201).json(user);
};

const requestLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await login({ email, password });
  if (user.token) {
    return res.status(200).json(user);
  }
  return res.status(401).json(user);    
};

module.exports = { createUser, requestLogin };