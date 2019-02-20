var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var chalk = require('chalk');
var logger = require('winston');
var path = require('path');
var connectedUser = require('./Models/connectedUser');
var util = require('./Utils/util')(models, logger);
var app = express()
var http = require('http').Server(app)
var bodyPaser = bodyParser.json()
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);
app.use(cors());
app.use(passport.initialize());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

mongoose.connect('mongodb://database/codeTherapy');
   var db = mongoose.connection;
 require('./Utils/database.js')(chalk, db);


	// Models - database Schemas
	var models = {
		mongoose: mongoose,
		document: require('./Models/document')(mongoose),
    user: require('./Models/user')(mongoose)
	};
	//Controllers - database functions
	var controller = {
		document: require('./Controllers/documentController')(models, logger,util),
    user: require('./Controllers/userController')(models, logger,util, passport),
	};

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on %s", port)
})

var io = require('socket.io').listen(server);

require('./Utils/passport');
require('./Utils/sockets')(app, io, connectedUser, controller)
require('./Utils/routes')(app, express, io, path, controller, util)
