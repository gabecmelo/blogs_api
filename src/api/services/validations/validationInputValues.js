const httpStatusHelper = require('../utils/httpStatusHelper');
const { registerUserSchema } = require('./schemas');

const validateNewUser = (userData) => {
  const { error } = registerUserSchema.validate(userData);
  if (error) {
    return { status: httpStatusHelper.BAD_REQUEST, message: error.message };
  }
};

const validateUserData = (userData, user) => {
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

module.exports = {
  validateNewUser,
  validateUserData,
};
