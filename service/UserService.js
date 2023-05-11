const UserModel = require('../model/UserModel');
const jwt = require('../helper/jwt');

const create = async (name, email, role, password) => {
  const roleExists = role || 'client'; 
  const newUser = await UserModel.create(name, email, roleExists, password);
  return { newUser, status: 200 };
};

const updateUserName = async (name, authorization) => {
  const decoded = jwt.decodeToken(authorization);
  await UserModel.updateByEmail(decoded.email, name);
  const success = `Nome atualizado para ${name}.`;
  return success;
};

const login = async (email, password) => {
  const user = await UserModel.findByEmail(email, password);
  if (!user || password !== user.password) {
    throw new Error('Email ou senha inválidos');
  }
  const token = jwt.createToken({
    email: user.email,
    role: user.role,
    name: user.name,
    id: user.id,
  });
  return {
    token,
    status: 200,
    email: user.email,
    role: user.role,
    name: user.name,
  };
};

module.exports = { create, login, updateUserName };