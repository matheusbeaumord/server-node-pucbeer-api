const SaleModel = require('../model/SaleModel');
const ProductService = require('./ProductService');
const SalesProductsModel = require('../model/SalesProductsModel');
const jwt = require('../helper/jwt');

const create = async (dAddress, dNumber, listProducts, authorization) => {
  const decoded = jwt.decodeToken(authorization);
  const produtosLista = await ProductService.getAll();
  const tPrice = Object.entries(listProducts).reduce((acc, product) => {
    const productQuantity = Number(product[1]);
    const productPrice = produtosLista[0].find((p) => p.id === Number(product[0])).price;
    return acc + (productQuantity * productPrice);
  }, 0);
  const allPropeties = {
    userId: decoded.id, tPrice, dAddress, dNumber, date: new Date(), status: 'Pendente',
  };

  const newSaleId = await SaleModel.create(allPropeties);
  Promise.all(
    Object.entries(listProducts).map((p) => SalesProductsModel.create(newSaleId, p[0], p[1])),
  );
};

const getAll = async (authorization) => {
  const decoded = jwt.decodeToken(authorization);
  const sales = await SaleModel.getAll(decoded.id);
  return sales;
};

const getReallyAll = async () => {
  const sales = await SaleModel.getReallyAll();
  return sales;
};

const getById = async (id) => {
  const sales = await SaleModel.getById(id);
  return sales;
};

const getSaleByOrderNumber = async (idDOPedido) => {
  const sale = await SaleModel.getById(idDOPedido);
  const products = await SaleModel.getByOrderNumber(idDOPedido);
  return { saleDetail: sale, productList: products };
};

const getAllOrders = async () => {
  const orders = await SaleModel.getAllOrders();
  return orders;
};

const saleUpdate = async (idDoPedido) => {
  const sale = await SaleModel.updateSale(idDoPedido);
  return sale;
};

module.exports = { 
create, 
getAll,
getSaleByOrderNumber,
getAllOrders,
getById,
getReallyAll,
saleUpdate };
