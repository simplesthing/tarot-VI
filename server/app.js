var express = require('express'),
	app = express(),
	config = require('./config.json') [app.get('env')],
	http = require('http'),
	path = require('path'),
	favicon = require('static-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorHandler'),
	fs = require('fs'),
	routes = require('./routes'),
	api = require('./routes/api');

app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(logger({
	format: 'tiny',
	stream: fs.createWriteStream('app.log', {'flags': 'w'})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// use __dirname make them actually seem like they're coming from the top level
app.use(express.static(path.join(__dirname, 'public')));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(errorHandler());
	// use stack trace in development
	app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.get('/', routes.index);
app.get('/api', api.root);
app.get('/api/cards', api.getAllCards);
app.get('/api/card/:index/:property?', api.getCard);


app.use(function (req,res){
	res.status(400);
	res.json({
		"data": "Resource Not Found"
	});
});

app.use(function(err, req, res, next) {
    res.status(500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
