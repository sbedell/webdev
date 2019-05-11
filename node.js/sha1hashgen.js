const crypto = require('crypto');
const fs = require('fs');

if (process.argv[2]) {
    const filename = process.argv[2];
    const input = fs.createReadStream(filename);
    let hash = crypto.createHash('sha1');

    input.on('readable', function() {
      let data = input.read();

      if (data) {
        hash.update(data);
      } else {
        let fileSHA1 = hash.digest('hex').toUpperCase();
        console.log(`\nThe SHA1 hash of ${filename} is \n\n${fileSHA1}`);
        
        if (process.argv[3]) {
            let hashToCheck = String(process.argv[3]).trim().toUpperCase();
            console.log("Hash match? ", fileSHA1 === hashToCheck);
        }
      }
    });
} else {
  console.error("\nPlease input a filename");
  console.error("Expected usage:");
  console.error("node sha1hashgen.js somefilename.filepath");
}
