const ProductModel = require('../model/ProductModel');

const getAll = async () => {
  const products = await ProductModel.allProducts();
  return products;
};

const addProduct = async (name, price, urlImage) => {
  try {
    const product = await ProductModel.addProduct(name, price, urlImage);
    return product;
  } catch (error) {
    throw new Error('Erro ao adicionar o produto');
  }
};

const updateProduct = async (id, name, price, urlImage) => {
  try {
    const product = await ProductModel.updateProduct(id, name, price, urlImage);
    return product;
  } catch (error) {
    throw new Error('Erro ao atualizar o produto');
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await ProductModel.deleteProduct(id);
    return result;
  } catch (error) {
    throw new Error('Erro ao excluir o produto');
  }
};

module.exports = {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
};
