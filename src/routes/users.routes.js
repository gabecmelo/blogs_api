const usersRoute = require('express').Router();
const { UserController } = require('../api/controllers');

usersRoute.post('/', UserController.register);

module.exports = usersRoute;
