var mongoose = require('mongoose');
var Product = mongoose.model('Product');



module.exports.getProducts = function(req, res){

  Product.find(req.query).exec(function (err, product) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not get the product.' });
    }

    res.status(200).json(product);
  });

};

module.exports.createProduct = function(req, res){

  var newProduct = new Product(req.body);

  newProduct.save(function (err, product) {

    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(product);
    }

  });
};

module.exports.editProduct = function(req, res){
  Product.findById(req.params.id).exec(function (err, product) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not get the product.' });
    }

    if (!!product) {
      res.status(200).json({ success: true, data: product });
    } else {
      return res.status(404).json({ success: false, message: 'The product was not found.' });
    }
  });
};

module.exports.updateProduct = function(req, res){

  Product.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(product);
    }
  });
};

module.exports.deleteProduct = function(req, res){
  Product.findByIdAndRemove(req.params.id, function (err, product) {
    if (err) return res.status(500).json({ success: false, message: 'Could not delete the product.' });

    console.log('LOG: Deleted ' + product.name);
    res.status(200).json(product);
  });
};

