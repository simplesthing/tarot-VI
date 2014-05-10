var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	favicon = require('static-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorHandler'),
	fs = require('fs'),
	app = express(),
	config = require('./config.json') [app.get('env')];

app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(logger({
	format: 'tiny',
	stream: fs.createWriteStream('app.log', {'flags': 'w'})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(errorHandler())
}

app.get('/', routes.index);
app.get('/api', api.root);

app.use(function (req,res){
	res.status(400);
	res.json({
		"message": "Resource Not Found"
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(config.db_host)
});
