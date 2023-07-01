const connection = require('./connection');

const messageErroConexão = 'Erro de conexão';

const create = async (tudao) => {
  const { userId, tPrice, dAddress, dNumber, date, status } = tudao;
  try {
    const result = await connection.query(
      `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, tPrice, dAddress, dNumber, date, status]
    );
    return result.rows[0].id;
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getAll = async (id) => {
  try {
    const sales = await connection.query(
      `SELECT * FROM sales 
      WHERE user_id = $1
      ORDER BY id`,
      [id]
    );
    return sales.rows;
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getReallyAll = async () => {
  try {
    const sales = await connection.query('SELECT * FROM sales');
    return sales.rows;
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getById = async (id) => {
  try {
    const sales = await connection.query('SELECT * FROM sales WHERE id=$1', [
      id,
    ]);
    return sales.rows;
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getByOrderNumber = async (idDOPedido) => {
  try {
    const sale = await connection.query(
      `
      SELECT sp.product_id, sp.quantity, p.price, p.name FROM sales s
      JOIN sales_products sp ON s.id=sp.sale_id
      JOIN products p ON p.id=sp.product_id
      WHERE s.id=$1;
      `,
      [idDOPedido]
    );
    return sale.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllOrders = async () => {
  try {
    const orders = await connection.query(
      `
      SELECT delivery_number, delivery_address, total_price FROM sales;
      `
    );
    return orders.rows;
  } catch (error) {
    throw new Error(error);
  }
};

const updateSale = async (idDoPedido) => {
  try {
    const result = await connection.query(
      `
      UPDATE sales
      SET status = 'Entregue'
      WHERE id = $1;
      `,
      [idDoPedido]
    );
    return result.rowCount;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  getAll,
  getByOrderNumber,
  getAllOrders,
  getById,
  getReallyAll,
  updateSale,
};
