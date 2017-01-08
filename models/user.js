var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  forename: String,
  surname: String
}, {timestamps: {}});

module.exports = mongoose.model('User', userSchema);