var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	app = express(),
	config = require('./config.json') [app.get('env')];

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger({
	format: 'tiny',
	stream: fs.createWriteStream('app.log', {'flags': 'w'})
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api', api.root);

app.use(function (req,res){
	res.status(400);
	fs.readFile('./public/404.html', function (err, content){
		res.send(content.toString());
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(config.db_host)
});
