const SalesService = require('../service/SaleService');

const create = async (req, res) => {
  // UserId DeliveryAdress DeliveryNumber {productId: quantity}
  const { deliveryAddress, deliveryNumber, listProducts } = req.body;
  const { authorization } = req.headers;
  try {
    const newSale = await SalesService.create(
      deliveryAddress,
       deliveryNumber,
       listProducts,
       authorization,
    );
    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getReallyAll = async (req, res) => {
  try {
    const allSales = await SalesService.getReallyAll();
    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const allSales = await SalesService.getAll(authorization);
    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const allSalesById = await SalesService.getById(id);
    return res.status(200).json(allSalesById);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getByNumber = async (req, res) => {
  const { idDOPedido } = req.params;
  try {
    const sale = await SalesService.getSaleByOrderNumber(idDOPedido);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await SalesService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { idDoPedido } = req.params;
  try {
    await SalesService.saleUpdate(idDoPedido);
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 

module.exports = { create, getAll, getByNumber, getAllOrders, getById, getReallyAll, update };
