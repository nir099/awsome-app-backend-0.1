const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    name: { type: String , required: true},
    password: { type: String , unique: true , required: true },
    email: { type: String , unique: true , required: true }
});

userSchema.path('email').validate((val) => {
    // eslint-disable-next-line no-useless-escape
    let emailval = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailval.test(val);
}, 'Invalid email');

// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      exp: parseInt(expiry.getTime() / 1000),
    }, 'jfnkwsugfiruwhfkjbw'); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

let User = mongoose.model('User',userSchema );

module.exports = { 
    User 
} ;
