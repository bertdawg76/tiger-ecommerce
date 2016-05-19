var Category = require('./category');
var mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({
  description: String,
  title: { type: String, required: true, trim: true },
  picture: { type: mongoose.Schema.Types.Mixed, required: true},
  morePictures: mongoose.Schema.Types.Mixed,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1, min: 0 },
  createdAt: {type: Date, default: Date.now},
  category: Category.categorySchema
});

ProductSchema.pre('save', function(next){
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next()
});



module.exports = mongoose.model('Product', ProductSchema);