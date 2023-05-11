const ProductModel = require('../model/ProductModel');

const getAll = async () => {
  const products = await ProductModel.allProducts();
  return products;
};

module.exports = { getAll };
