const https = require('https');

function doRequest(options) {
    return new Promise((resolve, reject) => {
        let req = https.request(options);

        req.on('response', function(res) {
            resolve(res);
        });

        req.on('error', function(err) {
            reject(err);
        });

        req.end();
    }); 
}

async function makeHTTPCallout(options) {
    try {
        let res = await doRequest(options);
        console.assert(res.statusCode == 200, "Should return HTTP 200 status code");
        return res;
    } catch(err) {
        console.error("Error occurred: " + err);
        return;
    }
}

const options = {
    hostname: 'haveibeenpwned.com',
    port: 443,
    // path: '/api/v2/breachedaccount/' + username.trim(),
    method: 'GET',
    headers: {
      'User-Agent': 'Pwnage-Checker-nodejs'
    }
};

console.log("starting callout...");
let res = makeHTTPCallout(options);
console.log(res);
console.log("ending callout");