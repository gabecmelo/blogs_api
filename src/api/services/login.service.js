const httpStatusHelper = require('./utils/httpStatusHelper');

const login = ({ email, password }) => {
  const token = `${email} ${password}`;

  // Verificar token

  return { status: httpStatusHelper.SUCCESSFUL, data: token };
};

module.exports = {
  login,
};
