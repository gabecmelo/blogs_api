const jwt = require('jsonwebtoken');
const { LoginService } = require('../api/services');

const secret = process.env.JWT_SECRET;

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
    const { email, password } = decoded;

    const user = await LoginService.getByLoginData({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
