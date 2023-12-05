const httpStatusHelper = require('./utils/httpStatusHelper');
const { validateUserLogin } = require('./validations/validationInputValues');
const { User } = require('../../models');
const createToken = require('../../auth/createToken');

const getByLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  return user;
};

const login = async (loginData) => {
  const error = validateUserLogin(loginData);
    if (error) {
    return { status: error.status, data: error.data };
  }
  const user = await getByLogin(loginData);

  if (!user) {
    return {
      status: httpStatusHelper.BAD_REQUEST,
      data: { message: 'Invalid fields' },
    };
  }

  const token = createToken(loginData);

  return { status: httpStatusHelper.SUCCESSFUL, data: { token } };
};

module.exports = {
  login,
  getByLogin,
};
