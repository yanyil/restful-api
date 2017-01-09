var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  forename: String,
  surname: String
}, { timestamps: {} });

module.exports = mongoose.model('User', userSchema);