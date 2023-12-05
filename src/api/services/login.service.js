const httpStatusHelper = require('./utils/httpStatusHelper');

const login = ({ email, password }) => {
  const token = `${email} ${password}`;

  // Criar token

  return { status: httpStatusHelper.SUCCESFULL, data: token };
};

module.exports = {
  login,
};
