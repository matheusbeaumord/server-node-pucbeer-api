const connection = require('./connection');

const messageErroConexão = 'Erro de conexão';

const create = async (tudao) => {
  const { userId, tPrice, dAddress, dNumber, date, status } = tudao;
  try {
    const newUser = await connection.execute(
      `INSERT INTO sales (user_id,total_price,delivery_address,delivery_number,sale_date,status) 
      VALUES (?,?,?,?,?,?)`,
      [userId, tPrice, dAddress, dNumber, date, status],
    );
    return newUser[0].insertId;
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getAll = async (id) => {
  try {
    const sales = await connection.execute(
      `SELECT * FROM sales 
      WHERE user_id = ?
      ORDER BY id`,
      [id],
    );
    return sales[0];
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getReallyAll = async () => {
  try {
    const sales = await connection.execute(
      'SELECT * FROM sales',
);
    return sales[0];
  } catch (error) {
    throw new Error(messageErroConexão);
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
    throw new Error(messageErroConexão);
  }
};

const getByOrderNumber = async (idDOPedido) => {
  try {
    const sale = await connection.execute(
      `
      select sp.product_id, sp.quantity, p.price, p.name from sales s
      join sales_products sp on s.id=sp.sale_id
      join products p on p.id=sp.product_id
      where s.id=?;
      `,
     [idDOPedido],
    );
    return sale[0];
  } catch (error) {
    throw new Error(error);
  }
};

  const getAllOrders = async () => {
    try {
      const orders = await connection.execute(
        `
        SELECT delivery_number, delivery_address, total_price FROM sales;
        `,
      );
    return orders[0];
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateSale = async (idDoPedido) => {
    try {
      const orders = await connection.execute(
        `
        UPDATE sales
        SET status = 'Entregue'
        WHERE id = ?;
        `,
        [idDoPedido],
      );
    return orders[0];
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
updateSale };
