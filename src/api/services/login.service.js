const httpHelper = require('./utils/httpHelper');
const { userValidations } = require('./validations');
const { User } = require('../../models');
const createToken = require('../auth/createToken');

const getByLoginData = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const login = async (loginData) => {
  const error = userValidations.validateUserLogin(loginData);
  if (error) {
    return { status: error.status, data: error.data };
  }

  const user = await getByLoginData(loginData);
  if (!user) {
    return {
      status: httpHelper.BAD_REQUEST,
      data: { message: 'Invalid fields' },
    };
  }

  const token = createToken(loginData);
  return { status: httpHelper.SUCCESSFUL, data: { token } };
};

module.exports = {
  login,
  getByLoginData,
};
