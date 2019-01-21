var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var chalk = require('chalk');
var logger = require('winston');
var path = require('path');
var connectedUser = require(__dirname + '/server/Models/connectedUser');
var util = require(__dirname + '/server/Utils/util');
var app = express()
var http = require('http').Server(app)
var bodyPaser = bodyParser.json()
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/code-therapy'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeTherapy',{ useNewUrlParser: true });
   var db = mongoose.connection;
 require(__dirname + '/server/Utils/database.js')(chalk, db);


	// Models - database Schemas
	var models = {
		mongoose: mongoose,
		document: require(__dirname + '/server/Models/document')(mongoose),
	};
	//Controllers - database functions
	var controller = {
		document: require(__dirname + '/server/Controllers/documentController')(models, logger),
	};

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on %s", port)
})

var io = require('socket.io').listen(server);

require(__dirname + '/server/Utils/sockets')(app, io, connectedUser)
require(__dirname + '/server/Utils/routes')(app, express, io, path, util)
