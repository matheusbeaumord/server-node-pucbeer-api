const url = require('url');
const ProductService = require('../service/ProductService');

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductService.getAll();
    const allProducts = result.map(({ url_image, ...product }) => ({
      ...product,
      urlImage: url.parse(url_image).href,
    }));
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, urlImage } = req.body;
  try {
    await ProductService.addProduct(name, price, urlImage);
    return res.status(201).json({ message: 'Produto adicionado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;
  try {
    await ProductService.updateProduct(id, name, price, urlImage);
    return res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductService.deleteProduct(id);
    return res.status(200).json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
