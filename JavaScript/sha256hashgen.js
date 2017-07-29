const crypto = require('crypto');
const fs = require('fs');

const filename = process.argv[2];
const hash = crypto.createHash('sha256');
const input = fs.createReadStream(filename);

input.on('readable', () => {
  const data = input.read();

  if (data)
    hash.update(data);
  else {
    console.log(`\nThe SHA-256 hash of ${filename} is`);
    console.log(`${hash.digest('hex')}`);
  }
});
