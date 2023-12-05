const httpStatusHelper = require('./utils/httpStatusHelper');
const { validateUserLogin } = require('./validations/validationInputValues');

const login = (loginData) => {
  const { email, password } = loginData;

  const error = validateUserLogin(loginData)

  if (error) {
    return {status: error.data, data: error.data}
  }

  return { status: httpStatusHelper.SUCCESSFUL, data: {email, password} };
};

module.exports = {
  login,
};
