const { validateToken } = require('./token');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não encontrado' });
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = validateToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }

  req.user = decoded; // Adiciona o payload do token ao objeto req
  next();
};
