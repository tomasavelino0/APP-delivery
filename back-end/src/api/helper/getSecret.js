const fs = require('fs');

const getSecret = () => {
  const keyFile = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  return keyFile;
};

module.exports = getSecret;