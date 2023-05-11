const jwt = require('jsonwebtoken');
require('dotenv').config();

// Não use process.env pra secret, o env não existe no remoto, só declare env pros lances do mysql do readme
const secret = 'batata';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign(data, secret, jwtConfig);

const decodeToken = (token) => jwt.verify(token, secret);

const validateToken = (token) => {
  try {
    decodeToken(token);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = { createToken, decodeToken, validateToken };
