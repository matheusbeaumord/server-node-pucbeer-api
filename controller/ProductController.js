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

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;

  try {
    // Verificar se o produto com o ID fornecido existe
    const existingProduct = await ProductService.getById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualizar os dados do produto
    await ProductService.updateProduct(id, name, price, urlImage);

    // Retornar o produto atualizado
    const updatedProduct = await ProductService.getById(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro de conexão' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o produto com o ID fornecido existe
    const existingProduct = await ProductService.getById(id);
    return res.status(200).json(existingProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro de ao pesquisar o produto' });
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

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  editProduct,
  getProductById,
};
