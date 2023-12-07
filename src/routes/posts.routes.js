const postsRoutes = require('express').Router();
const { validateToken } = require('../middlewares');
const { PostController } = require('../api/controllers');

postsRoutes.post('/', validateToken, PostController.insert);

postsRoutes.get('/', validateToken, PostController.getAll);

postsRoutes.get('/:id', validateToken, PostController.getById);

postsRoutes.put('/:id', validateToken, PostController.update);

postsRoutes.delete('/:id', validateToken, PostController.exclude);

module.exports = postsRoutes;
