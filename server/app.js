var express = require('express'),
	app = express(),
	http = require('http'),
	https = require('https'),
	path = require('path'),
	favicon = require('static-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorHandler'),
	passport = require('passport'),
	fs = require('fs'),
	mongoStore = require('connect-mongo')(session),
	config = require('./lib/config/config');

// connect to db
var  db = require('./lib/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// passport
var pass = require('./lib/config/pass');

app.use(favicon());
app.use(logger({
	format: 'tiny',
	stream: fs.createWriteStream('app.log', {'flags': 'w'})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret: 'snipe the cookie',
	store: new mongoStore({
		url: config.db,
		collection : 'sessions'
	})
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

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


app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

//  Load routes
require('./lib/config/routes')(app);

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

var port = process.env.PORT || 3000;
http.createServer(app).listen(port , function(){
  console.log('Express server listening on port %d', port);
});

var httpsOptions = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('key-cert.pem')
};

https.createServer(httpsOptions, app).listen(4443, function (){
	console.log('Secure server listening on 4443');
});
