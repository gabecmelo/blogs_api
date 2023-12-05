const mapStatusHttp = require('../../utils/mapStatusHttp');
const { UserService } = require('../services');

const register = async (req, res) => {
  try {
    const newUser = req.body;
    const { status, data } = await UserService.register(newUser);
    res.status(mapStatusHttp(status)).json(data);
  } catch (e) {
    console.log(e);
    res.status(mapStatusHttp(500)).json({ message: e });
  }
};

module.exports = {
  register,
};
