var passport = require('passport');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var User = require('../Models/user.js');








exports.authenticate = function(req, res, next) {
  var auth = passport.authenticate('local', function(err, user){
    if(err) {return next(err);}
    if(!user) {res.send({success:false})}
    req.logIn(user, function(err){
      if(err) {return next(err);}
      res.send({success:true, user: user});
    })
  });
  auth(req, res, next);
};



exports.authent = auth;


exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};
var userRoles = ['guest', 'user', 'admin'];
exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
};
















router.use('/', function(req, res, next){
  jwt.verify(req.query.token, process.env.JWT_Secret, function(err, decoded){
    if (err){
      return res.status(404).json({
        title: 'Authentication failed',
        error: err
      });
    }
    next();
  })
});









