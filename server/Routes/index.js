var express = require('express');
var jwt = require('express-jwt');
var passport = require('passport');




var router = express.Router();
/*var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});*/
var auth = require('../Config/auth');


var ctrlAuth = require('../controllers/authentication');
var ctrlProduct = require('../controllers/productCtrl');
var ctrlBraintree = require('../controllers/braintreeCtrl');
var ctrlOrders = require('../controllers/orderCtrl');


// authentication

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/Products', ctrlProduct.getProducts);
router.post('/Products', auth.authent, ctrlProduct.createProduct);
router.get('/Products/:id', auth.authent, ctrlProduct.editProduct);
router.put('/Products/:id', auth.authent,  ctrlProduct.updateProduct);
router.delete('/Products/:id', auth.authent, ctrlProduct.deleteProduct);

router.get('/braintree/client_token', ctrlBraintree.clientToken);
router.post('/braintree/checkout', ctrlBraintree.checkout);

router.get('/orders', ctrlOrders.getOrders);
router.get('/orders/:id', ctrlOrders.getOneOrder);
router.post('/orders', ctrlOrders.createOrder);
router.put('/orders/:id', ctrlOrders.updateOrder);
router.patch('/orders/:id', ctrlOrders.updateOrder);
router.delete('/orders/:id', ctrlOrders.deleteOrder);





module.exports = router;