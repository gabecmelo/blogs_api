const httpStatusHelper = require('../utils/httpStatusHelper');
const { registerUserSchema } = require('./schemas');

const validateNewUser = (userData) => {
  const { error } = registerUserSchema.validate(userData);
  if (error) {
    return { status: httpStatusHelper.BAD_REQUEST, message: error.message };
  }
};

const validateRegisterUserData = (userData, user) => {
  const error = validateNewUser(userData);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  if (user.data) {
    return {
      status: httpStatusHelper.CONFLICT,
      data: { message: 'User already registered' },
    };
  }
};

const validateUserLogin = ({ email, password }) => {
  if (!email || !password) {
    return {
      status: httpStatusHelper.BAD_REQUEST,
      data: { message: 'Some required fields are missing' },
    };
  }
};

module.exports = {
  validateNewUser,
  validateRegisterUserData,
  validateUserLogin,
};
