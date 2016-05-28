var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var history = mongoose.model('History');


router.get('/', function(req, res, next) {
  
	history.find().sort({'searched_when' : -1}).limit(10).exec(function(err,out){

		if(err)
			console.log(err);
		else{
			res.json(out);
		}

	});
});

module.exports = router;
