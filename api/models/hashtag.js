var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://irene:irene25@ds041643.mongolab.com:41643/newbie');

var HashTagSchema = new Schema ({
    name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

mongoose.model('HashTag', HashTagSchema);

