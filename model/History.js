var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://saifee:bailamose@ds025772.mlab.com:25772/shorturl');

autoIncrement.initialize(connection);

var newSchema = new mongoose.Schema({

	search_string : String,
	searched_when : Date

});

newSchema.plugin(autoIncrement.plugin, 'History');

mongoose.model("History", newSchema);