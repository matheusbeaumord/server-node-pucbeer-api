const jwt = require('../helper/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!jwt.validateToken(authorization)) {
    return res.status(400).send({ message: 'token inválido' });
  }
  next();
};
