/**
 * Generic POST request using node and it's https module
 */

const https = require("https");

function makePostRequest(hostname, path, headers, postDataString) {
  const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'POST',
    headers: headers
  };

  console.log("Sending POST request to " + options.hostname + options.path);

  let req = https.request(options, function(response) {
    console.log("Response headers: ", response.headers);
    
    response.on('data', (chunk) => {
      console.log(`\nBODY: ${chunk}`);
    });
  
    response.on('end', () => {
      console.log('\nNo more data in response.\n');
    });
  }); 
  
  req.on('error', function(e) {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postDataString);
  req.end();
}

// ----------------------------------

// any data to POST would go here.
const postDataString = "";

const headers = {
  'User-Agent': '', // fill this in
  'Content-Type': 'application/x-www-form-urlencoded', // change this as necessary
  'Content-Length': '' // change as necessary
};

// Example Usage:
// makePostRequest("bandcamp.com", "", headers, postDataString);