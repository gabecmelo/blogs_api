const Sequelize = require('sequelize');
const config = require('../../../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

module.exports = sequelize;