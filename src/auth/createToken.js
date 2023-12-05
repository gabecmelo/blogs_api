const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const createToken = (tokenData) => {
  const token = jwt.sign(tokenData, secret, jwtConfig);

  return token;
};

module.exports = createToken;
