var mongoose = require('mongoose');
var Order = mongoose.model('Order');



module.exports.getOrders = function(req, res){

  Order.find(req.query).exec(function (err, order) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not get the order.' });
    }

    res.status(200).json(order);
  });

};

module.exports.createOrder = function(req, res){

  var newOrder = new Order(req.body);

  newOrder.save(function (err, order) {

    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(order);
    }

  });
};

module.exports.getOneOrder = function(req, res){
  Order.findById(req.params.id).exec(function (err, order) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not get the order.' });
    }

    if (!!order) {
      res.status(200).json({ success: true, data: order });
    } else {
      return res.status(404).json({ success: false, message: 'The order was not found.' });
    }
  });
};

module.exports.updateOrder = function(req, res){

  Order.findByIdAndUpdate(req.params.id, req.body, function (err, order) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(order);
    }
  });
};

module.exports.deleteOrder = function(req, res){
  Order.findByIdAndRemove(req.params.id, function (err, order) {
    if (err) return res.status(500).json({ success: false, message: 'Could not delete the order.' });

    console.log('LOG: Deleted ' + order.name);
    res.status(200).json(product);
  });
};
