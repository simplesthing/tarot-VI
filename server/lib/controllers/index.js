var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
 fs.readFile(__dirname + '/../public/index.html', function(err, content){
  	res.send(content.toString());
  })
};