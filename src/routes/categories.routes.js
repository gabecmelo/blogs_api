const categoriesRoutes = require('express').Router();
const { validateToken } = require('../middlewares');
const { CategoryController } = require('../api/controllers');

categoriesRoutes.post('/', validateToken, CategoryController.insert);
categoriesRoutes.get('/', validateToken, CategoryController.getAll);

module.exports = categoriesRoutes;
