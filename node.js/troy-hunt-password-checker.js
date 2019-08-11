/**
 * Calls out to Troy Hunt's Have I Been Pwned APIs
 * https://haveibeenpwned.com/
 *  
 * Checks a password against Troy Hunt's haveibeenpwned service.
 * This can check plain text passwords and SHA1 hashes of passwords.
 *  
 * https://haveibeenpwned.com/Passwords
 * https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/
 * https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/
 */

const https = require('https');
const crypto = require('crypto');

function hasUserNameBeenPwned(username) {
  const options = {
    hostname: 'haveibeenpwned.com',
    port: 443,
    path: '/api/v2/breachedaccount/' + username.trim(),
    method: 'GET',
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs'
    }
  };

  const myRequest = https.request(options, (response) => {
    if (response.statusCode == 404) {
      console.log("Congrats - this username hasn't been found in the username breach db!");
    } else {
      let str = '';
      response.on('data', (chunk) => {
        str += chunk;
      });

      response.on('end', () => {
        console.log(str);
      });
    }
  });

  myRequest.on('error', (e) => {
    console.error(e);
  });

  myRequest.end();
}

/**
 * hasPasswordBeenPwned - Checks your password on Troy Hunt's password checker
 * Updated - 
 * @param {string} yourPassword - password string that you want to check
 */
function hasPasswordBeenPwned(yourPassword) {
  let sha1hashedPassword = crypto.createHash('sha1');
  sha1hashedPassword.update(yourPassword.trim());
  let sha1hashedPasswordDigest = sha1hashedPassword.digest('hex');
  // console.log("\nPassword SHA1 digest: " + sha1hashedPasswordDigest); // DEBUG

  const options = {
    hostname: 'api.pwnedpasswords.com',
    port: 443,
    path: '/range/' + sha1hashedPasswordDigest.slice(0,5),
    method: 'GET',
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs'
    }
  };
  
  console.log("Querying " + options.hostname + options.path); // INFO

  let req = https.request(options, (response) => {
    // console.log(response.headers);
    if (response.statusCode == 200) {
      let str = '';
      response.on('data', (chunk) => {
        str += chunk;
      });

      response.on('end', () => {        
        let match = false;
        let count = 0;
        
        str.split("\n").forEach(line => {
          // console.log(line.slice(0, line.indexOf(":"))); // DEBUG
          
          if (sha1hashedPasswordDigest.slice(5).toUpperCase() == line.slice(0, line.indexOf(":"))) {
            // console.log("[!!] we have a match!!\n"); // DEBUG
            count = Number.parseInt(line.slice(line.indexOf(":") + 1));
            match = true;
          }
        });

        if (match) {
          console.log(`\n[!] PWNED - this password has been seen ${count} times before.`);
          console.log("\"This password has previously appeared in a data breach and should never be used. If you've ever used it anywhere before, change it!\"");
          console.log(" - Troy Hunt");
        } else {
          console.log(`\nGood news — no pwnage found.
          This password wasn't found in any of the Pwned Passwords loaded into Have I been pwned. That doesn't necessarily mean it's a good password, merely that it's not indexed on this site.
          - Troy Hunt
          `);
        }
      });
    } else if (response.statusCode == 429) {
      console.log('Status Code: ' + response.statusCode);
      console.log("Rate limited :(");
    } else {
      console.log('Status Code: ' + response.statusCode);
    }
  }); 

  req.on('error', (e) => {
    console.error(e);
  });

  req.end();
}

// starting "main":

//console.log(process.argv);

if (process.argv[2]) {
  let yourPassword = process.argv[2].trim();
  hasPasswordBeenPwned(yourPassword);
}
