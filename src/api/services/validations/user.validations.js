const httpHelper = require('../utils/httpHelper');
const { loginSchema, registerUserSchema } = require('./schemas');

const validateNewUser = (userData) => {
  const { error } = registerUserSchema.validate(userData);
  if (error) {
    return { status: httpHelper.BAD_REQUEST, message: error.message };
  }
};

const validateRegisterUserData = (userData, user) => {
  const error = validateNewUser(userData);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  if (user.data) {
    return {
      status: httpHelper.CONFLICT,
      data: { message: 'User already registered' },
    };
  }
};

const validateUserLogin = (userLogin) => {
  const { error } = loginSchema.validate(userLogin);
  if (error) {
    return {
      status: httpHelper.BAD_REQUEST,
      data: { message: 'Some required fields are missing' },
    };
  }
};

const validateAuthorizedUser = (contentUserId, loggedUserId) => {
  if (contentUserId !== loggedUserId) {
    return {
      authorizedUser: httpHelper.UNAUTHORIZED,
      authorizedMessage: { message: 'Unauthorized user' },
    };
  }
  return {
    authorizedUser: httpHelper.SUCCESSFUL,
    authorizedMessage: { message: 'Authorized user' },
  };
};

module.exports = {
  validateUserLogin,
  validateNewUser,
  validateRegisterUserData,
  validateAuthorizedUser,
};
