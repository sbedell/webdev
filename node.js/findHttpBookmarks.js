/**
 * Goal - read my bookmarks json backup file and find all bookmarks 
 *        that are http:// only and not https://
 * 
 * Now adding some functionality to check if any bookmarks are 404ing
 */

const fs = require('fs');
const https = require("https");

const bookmarksFilename = "../../../../Downloads/bookmarks-2019-08-10.json";
// const bookmarksFilename = "../../../../Downloads/bookmarks-webdev-2019-08-05.json";

fs.readFile(bookmarksFilename, (err, data) => {
  if (!err) {
    let bookmarksBackup = JSON.parse(data);

    // children[0] is the Bookmarks Menu folder
    // the children of that seems to be each folder
    // console.log(bookmarksBackup.children[0].children);

    let bookmarksFolders = bookmarksBackup.children[0].children;
    
    // Printing in CSV file output, > pipe it to a csv file in the command line
    // console.log("URL,Title,Folder");
    console.log("URL, Title, Folder, Status Code");
    bookmarksFolders.forEach(bookmarksFolder => {
      // "bookmarksFolder.title" is the folder name that the bookmarks are in
      // Here it is...the actual bookmarks, except when there are subfolders...
      let bookmarks = bookmarksFolder.children;
      if (bookmarks) {
        bookmarks.forEach(bookmark => {
          // Checking for subfolders:
          if (bookmark.children) {
            bookmark.children.forEach(extraBookmark => {
              // console.log(extraBookmark);
              // console.log(`title: ${extraBookmark.title} \t URL: ${extraBookmark.uri}`);
              if (extraBookmark.uri.match(/http:\/\//)) {
                // console.log(`${extraBookmark.uri},${extraBookmark.title.replace(/,/g, " ")},${bookmark.title}`);
              } else {
                checkHttpsBookmark(extraBookmark.uri, extraBookmark.title, bookmark.title);
              }
            });
          } else {
            // console.log(bookmark);

            // This doesn't seem to be pulling the date correctly... hmmm
            // let dateAdded = new Date(bookmark.dateAdded);
            // console.log("date Added: ", dateAdded);
            // let lastModified = new Date(bookmark.lastModified);
            // console.log("last modified: ", lastModified);

            if (bookmark.uri && bookmark.uri.match(/http:\/\//)) {
              // console.log(`${bookmark.uri},${bookmark.title.replace(/,/g, " ")},${bookmarksFolder.title}`);
            } else if (bookmark.uri) {
              checkHttpsBookmark(bookmark.uri, bookmark.title, bookmarksFolder.title);
            }
          }
        });
      }
    });
  } else {
    console.error(err);
  }
});

function checkHttpsBookmark(httpsURL, urlTitle="", folderName="") {
  if (httpsURL.match(/^https:\/\//)) {
    // console.log("checking: ", httpsURL);
    https.get(httpsURL, (response) => { 
      if (response.statusCode !== 200) {
        console.log(`${httpsURL},${urlTitle.replace(/,/g, " ")},${folderName},${response.statusCode}`);
      }
  
      // res.on('data', (d) => {
      //   console.log(d);
      // });
    }).on('error', e => {
      console.log(`Error checking ${httpsURL} (${urlTitle.replace(/,/g, " ")}): ${e}`);
    });
  } else {
    console.log("skipping: ", httpsURL);
  }
}
