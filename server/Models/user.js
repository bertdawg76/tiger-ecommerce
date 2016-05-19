var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {type: String, unique: true },
  password: String,
  role: {type: String, default: 'user' },
  name: String,

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0},
    item: { type: Schema.Types.ObjectId, ref: ''}
  }]
});

//hash the password before we save it in the database

UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// compare password in the database and the one that the user types in

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
};

UserSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema);

