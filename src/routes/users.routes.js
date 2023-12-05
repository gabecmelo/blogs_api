const usersRoute = require('express').Router();
const { UserController } = require('../api/controllers');
const { validateToken } = require('../middlewares');

usersRoute.post('/', UserController.register);

usersRoute.get('/', validateToken, UserController.getAll);

module.exports = usersRoute;
