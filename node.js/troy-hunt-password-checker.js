/**
 * Calls out to Troy Hunt's Have I Been Pwned APIs
 * https://haveibeenpwned.com/API/v3
 *  
 * Checks a password against Troy Hunt's haveibeenpwned service.
 * This can check plain text passwords and SHA1 hashes of passwords.
 *  
 * https://haveibeenpwned.com/Passwords
 * https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/
 * https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/
 * https://www.troyhunt.com/authentication-and-the-have-i-been-pwned-api/
 */

const https = require('https');
const crypto = require('crypto');

// ---------------- Main --------------------------

if (process.argv[2] && process.argv[2] === "-p" && process.argv[3]) {
  let yourPassword = process.argv[3].trim();
  hasPasswordBeenPwned(yourPassword);
} else if (process.argv[2] && process.argv[2] === "-u" && process.argv[3]) {
  let yourUsername = process.argv[3].trim();
  hasUserNameBeenPwned(yourUsername);
} else {
  console.error("[!] Error: Please specify a username or password to check.");
  console.error("[!] node troy-hunt-password-checker.js, -p or -u, password or username");
}

/**
 * hasPasswordBeenPwned - Checks your password on Troy Hunt's password checker
 * @param {string} yourPassword - password string that you want to check
 */
function hasPasswordBeenPwned(yourPassword) {
  let sha1hashedPassword = crypto.createHash('sha1');
  sha1hashedPassword.update(yourPassword.trim());
  let sha1hashedPasswordDigest = sha1hashedPassword.digest('hex');
  // console.log("\nPassword SHA1 digest: " + sha1hashedPasswordDigest); // DEBUG

  const options = {
    hostname: 'api.pwnedpasswords.com',
    path: '/range/' + sha1hashedPasswordDigest.slice(0,5),
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs',
      'Add-Padding': true
    }
  };
  
  console.log("Querying " + options.hostname + options.path); // INFO

  https.get(options, (response) => {
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
            // TODO - Check if count is 0, that's just padding then, throw it out. Although that would be a SHA1 hash collision...
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
    } else {
      console.log('Status Code: ' + response.statusCode);
      if (response.statusCode == 429) { console.log("Rate limited :("); }
    }
  }).on('error', e => {
    console.error(e);
  });
}

function hasUserNameBeenPwned(username) {
  const options = {
    hostname: 'haveibeenpwned.com',
    path: '/api/v3/breachedaccount/' + username.trim(),
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs',
      "hibp-api-key": "testtesttest12345" // lol this obv doesn't work
    }
  };

  https.get(options, (response) => {
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
  }).on('error', e => {
    console.error(e);
  });
}
