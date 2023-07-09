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

const getAll = async (userId) => {
  try {
    const orders = await connection.query(
      `SELECT s.id AS sale_id, s.delivery_number, s.delivery_address, s.total_price, s.status,
        p.id AS product_id, p.name AS product_name, sp.quantity
      FROM sales s
      JOIN sales_products sp ON s.id = sp.sale_id
      JOIN products p ON sp.product_id = p.id
      WHERE s.user_id = $1
      ORDER BY s.id`,
      [userId]
    );
    const ordersMap = {};
    orders.rows.forEach((row) => {
      const {
        sale_id,
        delivery_number,
        delivery_address,
        total_price,
        status,
      } = row;
      if (!ordersMap[sale_id]) {
        ordersMap[sale_id] = {
          id: sale_id,
          delivery_number,
          delivery_address,
          total_price,
          status,
          products: [],
        };
      }
      ordersMap[sale_id].products.push({
        id: row.product_id,
        name: row.product_name,
        quantity: row.quantity,
      });
    });
    return Object.values(ordersMap);
  } catch (error) {
    throw new Error(messageErroConexão);
  }
};

const getReallyAll = async () => {
  try {
    const sales = await connection.query(`
      SELECT s.id AS sale_id, s.user_id, s.total_price, s.delivery_address, s.delivery_number, 
        s.sale_date, s.status,
        p.id AS product_id, p.name AS product_name, p.price AS product_price,
        sp.quantity
      FROM sales s
      JOIN sales_products sp ON s.id = sp.sale_id
      JOIN products p ON sp.product_id = p.id
    `);

    const formattedSales = sales.rows.reduce((acc, row) => {
      const existingSale = acc.find((sale) => sale.sale_id === row.sale_id);

      if (existingSale) {
        existingSale.products.push({
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          quantity: row.quantity,
        });
      } else {
        acc.push({
          sale_id: row.sale_id,
          user_id: row.user_id,
          total_price: row.total_price,
          delivery_address: row.delivery_address,
          delivery_number: row.delivery_number,
          sale_date: row.sale_date,
          status: row.status,
          products: [
            {
              product_id: row.product_id,
              product_name: row.product_name,
              product_price: row.product_price,
              quantity: row.quantity,
            },
          ],
        });
      }

      return acc;
    }, []);

    return formattedSales;
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

// const getAllOrders = async () => {
//   try {
//     const orders = await connection.query(
//       `
//       SELECT delivery_number, delivery_address, total_price FROM sales;
//       `
//     );
//     return orders.rows;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const getAllOrders = async () => {
  try {
    const orders = await connection.query(
      `
      SELECT s.id AS sale_id, s.delivery_number, s.delivery_address, s.total_price, s.status,
        p.id AS product_id, p.name AS product_name, sp.quantity
      FROM sales s
      JOIN sales_products sp ON s.id = sp.sale_id
      JOIN products p ON sp.product_id = p.id;
      `
    );

    // Organizar os dados em um formato adequado
    const formattedOrders = orders.rows.reduce((acc, row) => {
      const existingOrder = acc.find((order) => order.sale_id === row.sale_id);

      // Se o pedido já existir no resultado, adiciona o produto e quantidade a ele
      if (existingOrder) {
        existingOrder.products.push({
          product_id: row.product_id,
          product_name: row.product_name,
          quantity: row.quantity,
        });
      } else {
        // Se o pedido ainda não existir no resultado, cria um novo objeto de pedido com o produto e quantidade
        acc.push({
          sale_id: row.sale_id,
          delivery_number: row.delivery_number,
          delivery_address: row.delivery_address,
          total_price: row.total_price,
          status: row.status,
          products: [
            {
              product_id: row.product_id,
              product_name: row.product_name,
              quantity: row.quantity,
            },
          ],
        });
      }

      return acc;
    }, []);

    return formattedOrders;
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
