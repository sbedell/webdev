const fs = require('fs');
// const path = require('path');

if (!process.argv[2]) {
  console.error("\nPlease input a filename");
  // console.error("Expected usage:");
  // console.error("`node sha1hashgen.js somefilename`");
  return;
} else {
    const filename = process.argv[2];
    
    fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
            console.log('received data: \n' + data);

            console.log(data.split("\n"));
        } else {
            console.error(err);
        }
    });
}
