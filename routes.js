const express = require('express');
const checkToken = require('./middleware/checkToken');

const router = express.Router();

const userController = require('./controller/UserController');
const productsController = require('./controller/ProductController');
const saleControler = require('./controller/SaleController');

router.post('/user', userController.create);
// Recebe "name" no body e atualiza o nome do usuário. (Requer Token)
router.post('/updateUserName', checkToken, userController.updateUserName);

// Recebe "email" e "passowrd" através do body e recebe o token.
router.post('/login', userController.login);

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.addProduct);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.editProduct);
router.delete('/products/:id', productsController.deleteProduct);

router.post('/sale', saleControler.create);

// Listagem com todas as vendas.
router.get('/sale', saleControler.getReallyAll);

// Busca uma venda especifica atraves do id a venda.
router.get('/sale/:id', saleControler.getById);

router.get('/orders', saleControler.getAll);
// O "total_price" é o valor total do pedido
router.get('/orders/:idDOPedido', saleControler.getByNumber);
router.get('/admin/orders', saleControler.getAllOrders);
router.put('/admin/orders/:idDoPedido', saleControler.update);

module.exports = router;
