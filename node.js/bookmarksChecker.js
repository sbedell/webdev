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
  let bookmarkWithInfo = {
    url: bookmark.uri,
    title: bookmark.title,
    folder: folderName
  };

  if (bookmark.uri && bookmark.uri.match(/fbclid|gclid|utm_/)) {
    // console.log(`${bookmark.uri},${bookmark.title},${folderName},Query Param Found`);
    bookmarkWithInfo.queryParam = true;
  } else if (bookmark.uri && bookmark.uri.match(/^http:\/\//)) {
    console.log(`${bookmark.uri},${bookmark.title},${folderName}, HTTP URL Found`);
    bookmarkWithInfo.insecureHttp = true;
  } else if (bookmark.uri && bookmark.uri.match(/^javascript:/)) {
    // Return here, don't need to do an HTTP request for bookmarklets
    // skip?
    // return bookmarkWithInfo;
  } else if (bookmark.uri && bookmark.uri.match(/^https:\/\//)) {
    // bookmarkWithInfo.errorInfo =
    checkBookmarkHttpsRequest(bookmark, folderName);
  }

  return bookmarkWithInfo;
}

function checkBookmarkHttpsRequest(bookmark, folderName="") {
  const options = {
    timeout: 2000 // This is in milliseconds. 2 second timeout.
  };

  // Adding 403 but might want to remove it? idk yet.
  const statusCodesToCheck = [400, 401, 403, 404];

  https.get(bookmark.uri, options, response => {
    if (statusCodesToCheck.includes(response.statusCode)) {
      console.log(`${bookmark.uri.substring(0, 100)},${bookmark.title.replace(/,/g, " ").substring(0, 80)},${folderName},${response.statusCode}`);
      // return response.statusCode;
    }

    // The whole response has been received. Process the result.
    // response.on('end', () => {
    //   if (statusCodesToCheck.includes(response.statusCode)) {
    //   }
    // });
  }).on('error', e => {
    console.log(`${bookmark.uri.substring(0, 100)},${bookmark.title.replace(/,/g, " ").substring(0, 80)},${folderName},[!]Error: ${e}`);
  });
}

// function consolePrint(bookmark, folderName="", errors="") {
//   console.log(`${bookmark.uri.substring(0, 100)},${bookmark.title.replace(/,/g, " ").substring(0, 80)},${folderName},${errors}`);
// }

// ------------------------ "Main Program:" --------------------------------

if (process.argv[2]) {
  fs.readFile(process.argv[2], (err, data) => {
    if (!err) {
      let bookmarksBackup = JSON.parse(data);

      // children[0] is the Bookmarks Menu folder, the children of that is each folder.
      let bookmarksFolders = bookmarksBackup.children[0].children;

      // Printing in CSV file output, > pipe it to a csv file in the command line
      console.log("URL,Title,Folder,Error(s)");

      for (let bookmarksFolder of bookmarksFolders) {
        // Here it is...the actual bookmarks, except when there are subfolders.
        let bookmarks = bookmarksFolder.children;

        if (bookmarks) {
          for (let bookmark of bookmarks) {
            // Check for Subfolders:
            if (bookmark.children) {
              for (let childBookmark of bookmark.children) {
                // Extra loop or recursion for more subfolders??? Maybe.

                // Skip empty URLs
                if (!childBookmark.uri) {
                  continue;
                }

                checkBookmarkForIssues(childBookmark, bookmark.title);
              }
            } else {
              // console.log("Bookmark: ", bookmark.title);
              if (!bookmark.uri) {
                continue;
              }

              checkBookmarkForIssues(bookmark, bookmarksFolder.title);
            }
          }
        }
      }
    } else if (err && err.code === "ENOENT") {
      console.error(`[!] Error: file not found.`);
    } else {
      console.error(err);
    }
  });
} else {
  console.error("[!] Error: Please enter a bookmarks backup JSON file.");
}
