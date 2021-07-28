'use strict';

const express = require('express');
const coolAsciiFaces = require('cool-ascii-faces');
const helmet = require('helmet');

let app = express();

app.use(helmet());
// set the static files location; /public/img will be /img for users
app.use(express.static(__dirname + '/public'));     

// Display ascii / unicode faces either 5 times
app.get('/faces', function(request, response) {
	let result = [];
	for (let i = 0; i < 10; i++) {
		result.push(coolAsciiFaces());
	}
	response.send(result);
});

// Error handling:
app.use(function(err, req, res, next) {
	// prints stack trace to the console
	console.error(err.stack);

	// Sends generic error page to the user
  res.status(500).send('Error!');
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
