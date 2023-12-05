const { User } = require('../../models');
const httpStatusHelper = require('./utils/httpStatusHelper');
const {
  validateRegisterUserData,
} = require('./validations/validationInputValues');
const createToken = require('../../auth/createToken');

const sequelize = require('./utils/sequelize');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return { status: httpStatusHelper.SUCCESSFUL, data: user };
};

const register = async (newUserData) => {
  const { displayName, email, password, image } = newUserData;
  const user = await getUserByEmail(email);
  const error = await validateRegisterUserData(newUserData, user);

  if (error) {
    return { status: error.status, data: error.data };
  }

  const transactionResult = await sequelize.transaction(async (t) => {
    await User.create(
      { displayName, email, password, image },
      { transaction: t },
    );
    const token = createToken({ email, password });
    return { token };
  });
  return { status: httpStatusHelper.CREATED, data: transactionResult };
};

module.exports = {
  register,
  getUserByEmail,
};
