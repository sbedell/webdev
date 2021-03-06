const crypto = require('crypto');

if (process.argv[2]) {
  const inputString = process.argv[2];
  let hash = crypto.createHash('sha256');
  hash.update(inputString);

  //console.log(`\nThe SHA-256 hash of "${inputString}" is \n\n${hash.digest('hex').toUpperCase()}`);
  console.log(`\n${hash.digest('hex').toUpperCase()}`);
} else {
  console.error("\n[!] Please input a string");
  console.error("[!] Expected usage:");
  console.error("[!] `node sha256hashgen.js someString`");
}
