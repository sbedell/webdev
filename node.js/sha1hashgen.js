const crypto = require('crypto');
const fs = require('fs');

if (process.argv[2] == null) {
  console.error("\nPlease input a filename");
  console.error("Expected usage:");
  console.error("`node sha1hashgen.js somefilename`");
  return;
}

const filename = process.argv[2];
const input = fs.createReadStream(filename);
let hash = crypto.createHash('sha1');

input.on('readable', function() {
  let data = input.read();

  if (data) {
    hash.update(data);
  } else {
    console.log(`\nThe SHA1 hash of ${filename} is`);
    console.log(`${hash.digest('hex')}`);
  }
});
