const connection = require('./connection');

const create = async (saleId, userId, quantity) => {
  try {
    await connection.query(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ($1, $2, $3)',
      [saleId, userId, quantity]
    );
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

const getById = async (id) => {
  try {
    const sales = await connection.query('SELECT * FROM sales WHERE id=$1', [
      id,
    ]);
    return sales.rows;
  } catch (error) {
    throw new Error('messageErroConexão');
  }
};

module.exports = { create, getById };
