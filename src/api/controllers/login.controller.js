const mapStatusHttp = require('../../utils/mapStatusHttp');
const { LoginService } = require('../services');

const login = async (req, res) => {
  const loginCredentials = req.body;
  const { status, data } = await LoginService.login(loginCredentials);

  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  login,
};
