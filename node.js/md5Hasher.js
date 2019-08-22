const crypto = require('crypto');
const fs = require('fs');

if (process.argv[2] == null) {
  console.error("\nPlease input a filename");
  console.error("Expected usage:");
  console.error("`node md5Hasher.js somefilename`");
  return;
}

const filename = process.argv[2];
const input = fs.createReadStream(filename);
let hash = crypto.createHash('md5');

input.on('readable', () => {
  let data = input.read();

  if (data) {
    hash.update(data);
  } else {
    console.log(`\nThe MD5 hash of ${filename} is \n${hash.digest('hex')}`);
  }
});
