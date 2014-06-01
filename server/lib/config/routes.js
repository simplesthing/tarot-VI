'use strict';

var path = require('path'),
    auth = require('../config/auth'),
    fs = require('fs');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Api Routes  
  // Not ready to mongoose/Schema this yet....
  // app.get('/api', api.root);
  // app.get('/api/cards', api.getAllCards);
  // app.get('/api/card/:index/:property?', api.getCard);


  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }
    fs.readFile(__dirname + '/../public/index.html', function(err, content){
      res.send(content.toString());
    })
  });

}