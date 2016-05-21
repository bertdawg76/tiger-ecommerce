//Saved environment wicked awesome stuff

require('dotenv').load();

//Initialize Express
var express = require('express');
var app = express();
require('./server/Config/database');
require('./server/Config/passport');
//websocket stuff
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



require('./server/Models/user.js');
require('./server/Models/product.js');
require('./server/Models/braintree.js');
require('./server/Models/order.js');


//var routes = require('./server/Routes/index');
var port = 3200;




//middleware
app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket){
  console.log('a user has connected');
  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  })
});

app.use(cookieParser());
app.use(session({secret: process.env.JWT_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
var routes = require('./server/Routes/index');



app.use('/api', routes);




http.listen(port, function(err){
  if (err) throw err;
  console.log('server is running on port: ' + port)
});