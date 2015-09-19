// bring in the express module
var express = require("express");
// set up the environment variable to determine where we are depoloyed
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// instantiate express
var app = express();


// bring in our config object and getting the correct object based on where we are deployed
var config = require('./server/config/config')[env];
//  configure express based on where we are deployed...in here is where the stylus files get processed
require('./server/config/express')(app, config);
// connect to our database based on where we are deployed
require('./server/config/mongoose')(config);
// setup authentication and security
require('./server/config/passport')();
// set up the express routes
require('./server/config/routes')(app);
require('./server/config/errors')(app);

//app.listen(config.port);
app.set('port', config.port);
//app.listen(app.get('port'));
var server = require('http').Server(app);
//var io = require('socket.io')(server);
server.listen(app.get('port'));

// io.on('connection', function(socket){
// 	socket.emit('news', {hello: 'world'});
// 	socket.on('my other event', function(data){
// 		console.log(data);
// 	});
//});


console.log('Listening on port ' + config.port + "...");
