const UserModel = require('../model/UserModel');
const jwt = require('../helper/jwt');

const create = async (name, email, role, password) => {
  const roleExists = role || 'client';
  const newUser = await UserModel.create(name, email, roleExists, password);
  return { newUser, status: 200 };
};

const updateUserName = async (values, authorization) => {
  const { name, email } = values;
  const decoded = jwt.decodeToken(authorization);

  // Verificar se já existe um usuário com o email fornecido
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser && existingUser.email !== decoded.email) {
    throw new Error('Email already exists');
  }

  await UserModel.updateByEmail(decoded.email, { name, email });
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
