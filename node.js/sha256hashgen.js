/**
 * Check SHA-256 hash of a file.
 * 
 * First argument - the filename itself. ie "node sha256hashgen.js..."
 * Second argument - the filename to check [text string]
 * Can also pass a 3rd argument as the SHA-256 hash to check [text string]
 */

const crypto = require('crypto');
const fs = require('fs');

if (process.argv[2]) {
  const filename = process.argv[2];
  const input = fs.createReadStream(filename);
  let hash = crypto.createHash('sha256');

  input.on('readable', () => {
    let data = input.read();

    if (data) {
      hash.update(data);
    } else {
      let fileSHA256 = hash.digest('hex').toUpperCase();
      console.log(`\nSHA256 hash of ${filename}: \n\n${fileSHA256}`);
      
      // Use 3rd argument as a hash to check it with
      if (process.argv[3]) {
        let hashToCheck = String(process.argv[3]).trim().toUpperCase();
        console.log(hashToCheck);
        console.log("\nHash match? ", fileSHA256 === hashToCheck);
      }
    }
  });
} else {
  console.error("\nPlease input a filename");
  console.error("Expected usage:");
  console.error("`node sha256hashgen.js somefilename`");
} 
