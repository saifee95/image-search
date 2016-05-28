var express = require('express');
var router = express.Router();
var Search = require('bing.search');
var util = require('util');
var mongoose = require('mongoose');
var history = mongoose.model('History');

search = new Search('your account key');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Search Service'});
});

router.get('/search/:query',function(req,res){

	console.log(req.query.offset);
	//console.log(req.params.query);
	search.images(req.params.query, {top: 20}, function(err, results) {

		if(err)

			res.send(err);

		else{

			var newH = new history();
			newH.search_string = req.params.query;
			newH.searched_when = Date.now();

			newH.save(function(err,resp){

				if(err)
					console.log(err);
			});

			if((req.query.offset != undefined) && (req.query.offset >= 0)){

				results.splice(0,req.query.offset);
				res.json(results);
			}
    		else{
    			res.json(results);
    		}

    	}
  	});
});

module.exports = router;
