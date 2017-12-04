const crypto = require('crypto');

if (process.argv[2] == null) {
  console.error("\n[!] Please input a string");
  console.error("[!] Expected usage:");
  console.error("[!] `node sha256hashgen.js someString`");
  return;
}

const inputString = process.argv[2];
let hash = crypto.createHash('sha256');
hash.update(inputString);

console.log(`\nThe SHA-256 hash of ${inputString} is`);
console.log(`${hash.digest('hex')}`);
