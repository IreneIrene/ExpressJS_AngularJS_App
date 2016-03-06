var request = require('request');

function Auth() {
  var access_token;
  var consumerKey = 'VKvRDiNHlTMG1LfpAcOJ0dfbL';
  var consumerSecret = 'XLnPGfw9u8k3AAB0G7blYdD5msreAMiZWtiel5zAUIPgYjnrcg';
  var credentials = new Buffer(consumerKey + ':' + consumerSecret).toString('base64'); // base64 encoding
  var post_options = {
    url: 'https://api.twitter.com/oauth2/token',
    qs: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + credentials,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  function getAccessToken() {
    return access_token;
  }

  function setAccessToken(token) {
    access_token = token;
  }

  this.authenticate = function (ops, cb) {
    if (access_token) {
      cb(getAccessToken());
    } else {
      request.post(post_options, function (error, response, body) {
          setAccessToken(JSON.parse(body).access_token);
          cb(getAccessToken());
        }
      )
    }
  }
}

module.exports = new Auth();
