const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { User } = require('../../models');
const httpStatusHelper = require('./utils/httpStatusHelper');
const config = require('../../config/config');
const { validateUserData } = require('./validations/validationInputValues');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: httpStatusHelper.SUCCESSFUL, data: user };
};

const register = async (newUserData) => {
  const { displayName, email, password, image } = newUserData;
  const user = await getUserByEmail(email);
  const error = await validateUserData(newUserData, user);
  if (error) {
    return { status: error.status, data: error.data };
  }

  const transactionResult = await sequelize.transaction(async (t) => {
    await User.create(
      { displayName, email, password, image },
      { transaction: t },
    );
    const token = jwt.sign({ email, password }, secret, jwtConfig);
    return { token };
  });
  return { status: httpStatusHelper.CREATED, data: transactionResult };
};

module.exports = {
  register,
  getUserByEmail,
};
