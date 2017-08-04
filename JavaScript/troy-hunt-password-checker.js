/**
 * Calls out to Troy Hunt's Have I Been Pwned APIs
 * https://haveibeenpwned.com/
 *  
 * Checks a password against Troy Hunt's haveibeenpwned service.
 * This can check plain text passwords and SHA1 hashes of passwords.
 *  
 * https://haveibeenpwned.com/Passwords
 * https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/
 * 
 */

const https = require('https');
const crypto = require('crypto');

function hasUserNameBeenPwned(username) {
  //console.log("Calling haveibeenpwned.com...\n");

  const options = {
    hostname: 'haveibeenpwned.com',
    port: 443,
    path: '/api/v2/breachedaccount/' + username.trim(),
    method: 'GET',
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs'
    }
  };

  const myRequest = https.request(options, function(response) {
    if (response.statusCode == 404) {
      console.log("Congrats - this username hasn't been found in the username breach db!");
    } else {
      let str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        console.log(str);
      });
    }
  });

  myRequest.on('error', function(e) {
    console.error(e);
  });

  myRequest.end();
}

function hasPasswordBeenPwned(yourPassword) {
  const sha1hashedPassword = crypto.createHash('sha1');
  sha1hashedPassword.update(yourPassword.trim());

  const options = {
    hostname: 'haveibeenpwned.com',
    port: 443,
    path: '/api/v2/pwnedpassword/' + sha1hashedPassword.digest('hex'),
    method: 'GET',
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs'
    }
  };
  
  //console.log("Calling haveibeenpwned.com...\n");
  
  const req = https.request(options, function(response) {
    if (response.statusCode == 200) {
      console.log("Oh no — pwned! This password has previously appeared in a data breach and should never be used. If you've ever used it anywhere before, change it immediately!\n");
    } else if (response.statusCode == 404) {
      console.log("Good news — no pwnage found! This password wasn't found in any of the Pwned Passwords loaded into Have I been pwned. That doesn't necessarily mean it's a good password, merely that it's not indexed on this site.\n");
    } else if (response.statusCode == 429) {
      console.log('Status Code: ' + response.statusCode);
      console.log("Rate limited :(");
    } else {
      console.log('Status Code: ' + response.statusCode);
    }
  }); 

  req.on('error', function(e) {
    console.error(e);
  });

  req.end();
}
