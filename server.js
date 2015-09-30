var express = require('express');
var bodyParser = require('body-parser');
var tweetsearch = require('./routes/tweetsearch');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/tweets', tweetsearch);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 8888;

app.listen(port);
console.log("Listening on port 8888");