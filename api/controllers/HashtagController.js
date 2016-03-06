var Hashtag = require('../models/Hashtag');

module.exports = {
  find: function (req, res) {
    Hashtag.find(function (err, hashtags) {
      if (err) {
        res.send(err);
      } else {
        res.json(hashtags);
      }
    });
  },

  add: function (req, res) {
    if (req.body.length == 0) {
      res.status(400).send('Bad Request');
      return;
    }

    Hashtag.collection.insert(req.body, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({message: 'Hashtags created!'});
      }
    });
  }
};