var Client = require('node-rest-client').Client;

module.exports.TweetsService = function() {
    var twitterClient = new Client();

    twitterClient.registerMethod('search', 'https://api.twitter.com/1.1/search/${action}', 'GET');

    this.search = function(opts, callback) {
        console.log('Query: ' + opts.query);
        console.log('Bearer token:' + opts.access_token);

        var args = {
            path: {'action': 'tweets.json'},
            parameters: {
                'q': opts.query,
                'lang': 'en',
                count: 50,
                randomParam: Math.random() * 1000
            },
            headers: {Authorization: 'Bearer ' + opts.access_token}
        };
        twitterClient.methods.search(args, function(data, response) {
            if (typeof String.prototype.startsWith != 'function') {
                String.prototype.startsWith = function(str){
                    return this.indexOf(str) === 0;
                };
            }

            var tags = [];
            var arr = opts.query.split("%23");
            var val = arr[1];

            for(var i = 0; i < data.statuses.length; i++) {
                var item = data.statuses[i];

                for(var j = 0; j < item.entities.hashtags.length; j++) {
                    var tag  = item.entities.hashtags[j].text;

                    if(tags.indexOf(tag) > -1) continue;

                    tag.toLowerCase();

                    if(tag.startsWith(val)){
                        tags.push(tag);
                    }
                }

                var reformatedTags = tags.map(function (tagName) {
                    var rObj = {};
                    rObj.name = tagName;
                    return rObj;
                });

            }

            callback(reformatedTags);
        })
    };
    return this;
};