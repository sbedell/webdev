/**
 * Read Firefox bookmarks json backup file and find all bookmarks 
 * that are http:// only and not https://
 * 
 * Now adding functionality to check if any bookmarks are not returning HTTP 200.
 */

const fs = require('fs');
const https = require("https");

// --------------------- Functions --------------

function checkBookmarkForIssues(bookmark, folderName) {
  if (bookmark.uri && bookmark.uri.match(/fbclid|gclid|utm_/)) {
    console.log(`Query Param found: ${bookmark.uri},${bookmark.title},${folderName}`);
  } else if (bookmark.uri && bookmark.uri.match(/^http:\/\//)) {
    console.log(`HTTP found: ${bookmark.uri},${bookmark.title},${folderName}`);
  } else if (bookmark.uri && bookmark.uri.match(/^https:\/\//)) {
    checkBookmarkHttpsRequest(bookmark.uri, bookmark.title, folderName);
  } else {} // idk? skip?
}

function checkBookmarkHttpsRequest(httpsURL, urlTitle="", folderName="") {
  // const options = {
  //   url: httpsURL,
  //   timeout: 1000 // i believe this is in ms
  // };

  https.get(httpsURL, response => {
    if (response.statusCode !== 200) {
      console.log(`${httpsURL.substr(0, 100)},${urlTitle.replace(/,/g, " ").substring(0, 80)},${folderName},${response.statusCode}`);
    }
  }).on('error', e => {
    console.log(`Error checking ${httpsURL.substr(0, 100)},${urlTitle.replace(/,/g, " ").substring(0, 80)},${folderName},${e}`);
  });
}

// -------------------------"Main Program:"---------------------------------

if (process.argv[2]) {
  fs.readFile(process.argv[2], (err, data) => {
    if (!err) {
      let bookmarksBackup = JSON.parse(data);

      // children[0] is the Bookmarks Menu folder, the children of that is each folder.
      let bookmarksFolders = bookmarksBackup.children[0].children;

      // Printing in CSV file output, > pipe it to a csv file in the command line
      console.log("URL,Title,Folder,HTTP-Status-Code");

      bookmarksFolders.forEach(bookmarksFolder => {
        // Here it is...the actual bookmarks, except when there are subfolders.
        let bookmarks = bookmarksFolder.children;
        if (bookmarks) {
          bookmarks.forEach(bookmark => {
            // Check for Subfolders:
            if (bookmark.children) {
              for (let childBookmark of bookmark.children) {
              //bookmark.children.forEach(childBookmark => {
                // console.log("Child bookmark: ", childBookmark.title);
                checkBookmarkForIssues(childBookmark, bookmark.title);
              //});
              }
            } else {
              // console.log("Bookmark: ", bookmark.title);
              checkBookmarkForIssues(bookmark, bookmarksFolder.title);
            }
          });
        }
      });
    } else if (err && err.code === "ENOENT") {
      console.error(`[!] Error: file not found.`);
    } else {
      console.error(err);
    }
  });
} else {
  console.error("[!] Error: Please enter a bookmarks backup JSON file.");
}
