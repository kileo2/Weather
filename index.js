var express = require('express');
var config = require('./config/config');

var app = express();

require('./config/express')(app, config);

console.log('info',"Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on port:" + " " +  config.port + " "+ app.get('env')+ "localhost:" + config.port);
});

module.exports = app;