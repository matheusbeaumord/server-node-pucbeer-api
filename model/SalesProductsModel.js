const connection = require('./connection');

const create = async (saleId, userId, quantity) => {
  try {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [saleId, userId, quantity],
    );
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

const getById = async (id) => {
  try {
    const sales = await connection.execute(
      'SELECT * FROM sales WHERE id=?', 
      [id],
    );
    return sales[0];
  } catch (error) {
    throw new Error('messageErroConexão');
  }
};

module.exports = { create, getById };
