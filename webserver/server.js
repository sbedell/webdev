'use strict';

const express = require('express');
const helmet = require('helmet');

var app = express();
app.use(helmet());

// set the static files location; /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Error handling:
app.use(function(err, req, res, next) {
	// prints stack trace to the console
	console.error(err.stack);

	// Sends generic error page to the user
    res.status(500).send('Error!');
});

app.get('/', function(request, response) {
	response.send("Hello World");
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
