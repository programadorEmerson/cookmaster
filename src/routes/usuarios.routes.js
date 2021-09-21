const { Router } = require('express');
const { 
  userExists,
  verifyPassword,
  verifyName,
  verifyEmail,
  verifyEmailToLogin,
  verifyPasswordToLogin,
 } = require('../middlewares/usuarios.meddlewares');

const { createUser, requestLogin } = require('../controllers/usuarios.controller');

const routes = new Router();

routes.get('/', (_request, response) => {
  response.send();
});

routes.post('/users', 
  verifyName,
    verifyEmail,
      verifyPassword,
        userExists, 
          createUser);

routes.post('/login', 
  verifyEmailToLogin,
    verifyPasswordToLogin,
      requestLogin);

module.exports = routes;