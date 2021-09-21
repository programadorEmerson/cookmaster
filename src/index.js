const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/usuarios.routes');
const recipesRoutes = require('./routes/recipes.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(recipesRoutes);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});
