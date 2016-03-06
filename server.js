var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./config/routes');

var app = express();

var staticPath = path.normalize(__dirname + '/bower_components');
app.use('/bower_components', express.static(staticPath));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use('/', router);

var port = process.env.PORT || 8888;

app.listen(port, function () {
  console.log("Listening on port 8888");
});
