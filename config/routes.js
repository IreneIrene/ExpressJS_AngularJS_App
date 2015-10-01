var express = require('express');
var request = require('request');
var router = express.Router();
var tweetService = require('./../services/tweets').TweetsService();
var authService = require('./../services/authenticator').Authenticator();
var HashTag = require('./../api/controllers/HashtagController');

// route middleware that will happen on every request
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/', function (req, res) {
    res.render('index');
});

//two middleware components using authService and tweetService
router.get('/tweets', function(req, res, next) {
        authService.authenticate({}, function (token) {
            req.access_token = token;
            next();
        })
    },
    function(req, res, next) {
        var opts = {
            query: req.query.q,
            access_token: req.access_token
        };
        tweetService.search(opts, function(data) {
            res.json(data);
        });
    }
);

router.get('/hashtags', function(req, res) {
    HashTag.find(req, res);
});

router.post('/hashtags', function(req, res) {
    HashTag.add(req, res);
});

module.exports = router;