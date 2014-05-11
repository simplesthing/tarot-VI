var env = process.env.NODE_ENV || 'development',
	config = require('../config.json') [env],
	monk = require('monk'),
	db = monk(config.db_host + '/' + config.db_name),
	cards = db.get('cards');


exports.root = function (req, res){
	res.json({'data':'You must enter a query in the form of api/card/:index/:property?'})	
};

exports.getAllCards = function (req, res){
	cards.find({}, function (err, cards) {
		if(err) res.json(500, err);
		else res.json(cards);
	});
};

exports.getCard = function (req, res){
	if(req.params.property) {
		cards.find({"index": req.params.index}, req.params.property, function (err, card){
			if(err) res.json(500, err);
			else res.json(card);
		})
	} else {
		cards.find({"index": req.params.index}, function (err, card){
			if(err) res.json(500, err);
			else res.json(card);
		});
	}
};

