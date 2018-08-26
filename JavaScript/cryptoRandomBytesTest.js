const crypto = require('crypto');

// Asynchronous
crypto.randomBytes(256, function(err, buf) {
  if (err) { throw err; }
  console.log(`\n${buf.length} bytes of random data, async: ${buf.toString('hex')}`);
});

crypto.randomBytes(16, function(err, buf) {
  if (err) { throw err; }
  console.log(`\n${buf.length} bytes of random data, async: ${buf.toString('hex')}`);
});

// Synchronous
const buf = crypto.randomBytes(256);
console.log(`\n${buf.length} bytes of random data: ${buf.toString('hex')}`);
