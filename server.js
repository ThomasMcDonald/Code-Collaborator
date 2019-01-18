var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var chalk = require('chalk');
var logger = require('winston');
var path = require('path');
var connectedUser = require(__dirname + '/server/Models/connectedUser');
var app = express()
var http = require('http').Server(app)
var bodyPaser = bodyParser.json()

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/code-therapy'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);


var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on %s", port)
})

var io = require('socket.io').listen(server);

require(__dirname + '/server/Utils/sockets')(app, io, connectedUser)
require(__dirname + '/server/Utils/routes')(app, express, io, path)
