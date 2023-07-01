const connection = require('./connection');

const allProducts = async () => {
  try {
    const products = await connection.query('SELECT * FROM products;');
    return products;
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

module.exports = { allProducts };
