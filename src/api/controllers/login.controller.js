const mapStatusHttp = require('../../utils/mapStatusHttp');
const { LoginService } = require('../services');

const login = async (req, res) => {
  try {
    const loginData = req.body;
    const { status, data } = await LoginService.login(loginData);
    return res.status(mapStatusHttp(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  login,
};
