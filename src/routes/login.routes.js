const loginRoute = require('express').Router();
const { LoginController } = require('../api/controllers');

loginRoute.post('/', LoginController.login);

module.exports = loginRoute;
