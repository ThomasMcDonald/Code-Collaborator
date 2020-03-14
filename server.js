const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk');
const logger = require('winston');
const path = require('path');
const io = require('socket.io')(80);
const fs = require('fs');

const util = require(__dirname + '/server/Utils/util');
const app = express();

const bodyPaser = bodyParser.json()
const Sequelize = require('sequelize');

const port = process.env.PORT || 8080;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);

const sequelize = new Sequelize('code-collab', 'root', '', {
	host: 'localhost',
  dialect: 'mysql',
  logging: false
  });

  sequelize
  .authenticate()
  .then(() => {
	console.log('Connection has been established successfully.');
  })
  .catch(err => {
	console.error('Unable to connect to the database:', err);
  });


const server = app.listen(port, function () {
   const host = server.address().address
   const port = server.address().port
   console.log("Listening on %s %s", host, port)
})

if (!fs.existsSync('./tmp')){
  fs.mkdirSync('./tmp');
}


// const io = require('socket.io').listen(server);
require(__dirname + '/server/Utils/sockets')(app, io)

require(__dirname + '/server/Utils/routes')(app, path, util);

module.exports = app;