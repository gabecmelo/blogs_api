const { User } = require('../../models');
const httpHelper = require('./utils/httpHelper');
const {
  userValidations,
} = require('./validations');
const createToken = require('../auth/createToken');
const sequelize = require('./utils/sequelize');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: httpHelper.SUCCESSFUL, data: user };
};

const register = async (newUserData) => {
  const { displayName, email, password, image } = newUserData;
  const user = await getByEmail(email);
  const error = await userValidations.validateRegisterUserData(newUserData, user);
  if (error) {
    return { status: error.status, data: error.data };
  }
  const transactionResult = await sequelize.transaction(async (t) => {
    await User.create({ displayName, email, password, image }, { transaction: t });
    const token = createToken({ email, password });
    return { token };
  });
  return { status: httpHelper.CREATED, data: transactionResult };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  if (!users) {
    return { status: httpHelper.SUCCESSFUL, data: { message: 'There are no registered users' } };
  }
  return { status: httpHelper.SUCCESSFUL, data: users };
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id }, attributes: ['id', 'displayName', 'email', 'image'], 
  });
  if (!user) {
    return { status: httpHelper.NOT_FOUND, data: { message: 'User does not exist' } };
  }
  return { status: httpHelper.SUCCESSFUL, data: user };
};

const exclude = async (userId) => {
  const { data } = await getById(userId);
  await data.destroy();
  return { status: httpHelper.NO_CONTENT };
};

module.exports = {
  register,
  getByEmail,
  getAll,
  getById,
  exclude,
};
