const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Employee= require("./employeeModel")

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email:{ type: String, unique: true, required: true},
  hash: String,
  salt: String,
  Role:{
    type: String,
    enum:['Admin','User']
  }
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    Role:this.Role,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id:this._id,
    email: this.email,
    Role:this.Role,
    token: this.generateJWT(),
  };
};

mongoose.model('userModel', UsersSchema);