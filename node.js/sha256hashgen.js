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
      
      if (process.argv[3]) {
          let hashToCheck = String(process.argv[3]).trim().toUpperCase();
          console.log("\nHash match? ", fileSHA256 === hashToCheck);
      }
    }
  });
} else {
  console.error("\nPlease input a filename");
  console.error("Expected usage:");
  console.error("`node sha256hashgen.js somefilename`");
} 
