const express = require('express');

const { loginRoutes, usersRoutes, categoriesRoutes, postsRoutes } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', postsRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
