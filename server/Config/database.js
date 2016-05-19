var mongoose = require('mongoose');
var dbURI = process.env.mlabURI;
if (process.env.NODE_ENV === 'production'){
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('mongoose connected!');
});

require('../Models/user');
require('../Models/product');
