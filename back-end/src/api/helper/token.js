const jwt = require('jsonwebtoken');
const getSecret = require('./getSecret');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const JWT_SECRET = getSecret();

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
