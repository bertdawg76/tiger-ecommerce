var express = require('express');
var jwt = require('express-jwt');
var passport = require('passport');
var multiparty = require('connect-multiparty');

var uploadOptions = {
  autoFile: true,
  uploadDir: 'public/assets/uploads'
};

var router = express.Router();
/*var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});*/
var auth = require('../Config/auth');


var ctrlAuth = require('../controllers/authentication');
var ctrlProduct = require('../controllers/productCtrl');
//var auth = require('../Config/auth.js');

// authentication

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/Products', ctrlProduct.getProducts);




router.post('/Products', auth.authent, ctrlProduct.createProduct);
router.get('/Products/:id', ctrlProduct.editProduct);
router.put('/Products/:id', auth.authent,  ctrlProduct.updateProduct);
router.delete('/Products/:id', auth.authent, ctrlProduct.deleteProduct);

module.exports = router;