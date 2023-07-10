const connection = require('./connection');

const create = async (name, email, role, password) => {
  try {
    const newUser = await connection.query(
      'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, role, password]
    );
    return { id: newUser.rows[0].id, name, email, role, password };
  } catch (error) {
    throw new Error('Email já cadastrado');
  }
};

const findByEmail = async (email) => {
  try {
    const user = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return user.rows[0];
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

const updateByEmail = async (email, values) => {
  const { name, email: newEmail } = values;
  try {
    const user = await connection.query(
      'UPDATE users SET name = $1, email = $2 WHERE email = $3',
      [name, newEmail, email]
    );
    return user.rowCount;
  } catch (error) {
    throw new Error('Erro de conexão.');
  }
};

module.exports = { create, findByEmail, updateByEmail };
