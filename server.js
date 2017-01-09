var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('config');

var db = process.env.dbHost || config.dbHost;
mongoose.connect(db);
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + db);
})

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/user'));

var port = process.env.PORT || config.port;
app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;