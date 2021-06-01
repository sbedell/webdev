/**
 * Check SHA-256, SHA-1, MD5 hash of a file.
 * 
 * First argument - The file to hash. (process.argv[2])
 * Second argument - hash type (sha1, sha256, md5), optional - defaults to SHA-256.
 * Third argument - hash / checksum to check the hash with.
 */

const crypto = require('crypto');
const fs = require('fs');

// console.log(process.argv)

if (process.argv[2]) {
  const filename = process.argv[2];
  const input = fs.createReadStream(filename);
  let hash = crypto.createHash('sha256'); // defaulting to sha256. 
  // console.log(hash);

  if (process.argv[3]) {
    if (process.argv[3] === "md5") { 
      hash = crypto.createHash("md5");
    } else if (process.argv[3] === "sha1") {
      hash = crypto.createHash("sha1")
    } else if (process.argv[3] === "sha256") {
      // kinda redundant and could remove this?
      hash = crypto.createHash("sha256")
    }
  }

  input.on('readable', () => {
    let data = input.read();

    if (data) {
      hash.update(data);
    } else {
      let hashDigest = hash.digest('hex').toLowerCase();
      console.log(`\n${process.argv[3]} hash of ${filename}: \n\n${hashDigest}`);
      
      // Use 4th argument as a hash to check it with
      if (process.argv[4]) {
        let hashToCheck = String(process.argv[4]).trim().toLowerCase();
        console.log(hashToCheck);
        console.log("\nHash match?", (hashDigest === hashToCheck ? "Yes": "No"));
      }
    }
  });
} else {
  console.error("\n[*] Error: Please input a filename.");
  console.error("Expected usage:\n`node fileHasher.js somefilename`");
} 