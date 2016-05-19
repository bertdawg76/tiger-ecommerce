var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');



  var User = mongoose.model('User');
  passport.use(new LocalStrategy({
        usernameField: 'email'
      },
      function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: 'incorrect username.'
            });
          }
          if (!user.comparePassword(password)) {
            return done(null, false, {
              message: 'incorrect password.'
            });
          }
          return done(null, user);
        })

      }
  ));

  passport.use(new BearerStrategy({}, function (token, done) {
   User.findOne({_id: token}, function (err, user) {
   if (!user)
   return done(null, false);
   return done(null, user);
   })
   }));

 passport.serializeUser(function (user, done) {
    if (user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}).exec(function (err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  });


/*var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function() {
  passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({username:username}).exec(function(err, user) {
          if(user && user.authenticate(password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
      }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  })

}*/