const connection = require('./connection');

const allProducts = async () => {
  try {
    const products = await connection.query('SELECT * FROM products');
    return products.rows;
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

const addProduct = async (name, price, url_image) => {
  try {
    const query =
      'INSERT INTO products (name, price, url_image) VALUES ($1, $2, $3)';
    await connection.query(query, [name, price, url_image]);
  } catch (error) {
    throw new Error('Erro ao adicionar o produto');
  }
};

const getById = async (id) => {
  try {
    const query = await connection.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return query.rows[0];
  } catch (error) {
    throw new Error('Não foi encontrato nenhum produto');
  }
};

// update ainda com problema
const updateProduct = async (name, price, url_image, id) => {
  try {
    const query =
      'UPDATE products SET name = $1, price = $2, url_image = $3 WHERE id = $4';
    await connection.query(query, [name, price, url_image, id]);
  } catch (error) {
    throw new Error('Erro ao atualizar o produto');
  }
};

const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM products WHERE id = $1';
    await connection.query(query, [id]);
  } catch (error) {
    throw new Error('Erro ao remover o produto', error);
  }
};

module.exports = {
  allProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getById,
};
