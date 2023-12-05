const { User } = require('../../models');
const httpStatusHelper = require('./utils/httpStatusHelper');
const {
  validateRegisterUserData,
} = require('./validations/validationInputValues');
const createToken = require('../auth/createToken');

const sequelize = require('./utils/sequelize');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: httpStatusHelper.SUCCESSFUL, data: user };
};

const register = async (newUserData) => {
  const { displayName, email, password, image } = newUserData;
  const user = await getByEmail(email);
  const error = await validateRegisterUserData(newUserData, user);
  if (error) {
    return { status: error.status, data: error.data };
  }
  const transactionResult = await sequelize.transaction(async (t) => {
    await User.create({ displayName, email, password, image }, { transaction: t });
    const token = createToken({ email, password });
    return { token };
  });
  return { status: httpStatusHelper.CREATED, data: transactionResult };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!users) {
    return {
      status: httpStatusHelper.SUCCESSFUL,
      data: { message: 'Não existem usuários cadastrados' },
    };
  }
  return { status: httpStatusHelper.SUCCESSFUL, data: users };
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!user) {
    return { status: httpStatusHelper.NOT_FOUND, data: { message: 'User does not exist' } };
  }
  return { status: httpStatusHelper.SUCCESSFUL, data: user };
};

module.exports = {
  register,
  getByEmail,
  getAll,
  getById,
};
