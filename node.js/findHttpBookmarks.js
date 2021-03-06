/**
 * Goal - read my bookmarks json backup file and find all bookmarks 
 *        that are http:// only and not https://
 * 
 * Now adding some functionality to check if any bookmarks are 404ing
 */

const fs = require('fs');
const https = require("https");

const bookmarksFilename = "../../../../Downloads/bookmarks-2019-12-22.json";

fs.readFile(bookmarksFilename, (err, data) => {
  if (!err) {
    let bookmarksBackup = JSON.parse(data);

    // children[0] is the Bookmarks Menu folder
    // the children of that seems to be each folder

    let bookmarksFolders = bookmarksBackup.children[0].children;
    
    // Printing in CSV file output, > pipe it to a csv file in the command line
    console.log("URL,Title,Folder");

    bookmarksFolders.forEach(bookmarksFolder => {
      // "bookmarksFolder.title" is the folder name that the bookmarks are in
      // Here it is...the actual bookmarks, except when there are subfolders...
      let bookmarks = bookmarksFolder.children;
      if (bookmarks) {
        bookmarks.forEach(bookmark => {
          checkHTTP(bookmark, bookmarksFolder);
        });
      }
    });
  } else {
    console.error(err);
  }
});

function checkHttpsBookmark(httpsURL, urlTitle="", folderName="") {
  if (httpsURL.match(/^https:\/\//)) {
    https.get(httpsURL, (response) => { 
      if (response.statusCode !== 200) {
        console.log(`${httpsURL},${urlTitle.replace(/,/g, " ")},${folderName},${response.statusCode}`);
      }
    }).on('error', e => {
      console.log(`Error checking ${httpsURL},${urlTitle.replace(/,/g, " ")},${folderName},${e}`);
    });
  } else {
    console.log(`Skipping - ${httpsURL},${urlTitle.replace(/,/g, " ")},${folderName},...`);
  }
}

function checkHTTP(bookmark, bookmarksFolder) {
  // Checking for subfolders:
  if (bookmark.children) {
    bookmark.children.forEach(extraBookmark => {
      if (extraBookmark.uri.match(/http:\/\//)) {
        console.log(`${extraBookmark.uri},${extraBookmark.title.replace(/,/g, " ")},${bookmark.title}`);
      }
    });
  } else {
    // if (!bookmark.uri) {
      // console.log("weird: ", bookmark);
      // Oh...it's a "separator" line in the folders...holy shit...
    // }
    if (bookmark.uri && bookmark.uri.match(/http:\/\//)) {
      console.log(`${bookmark.uri},${bookmark.title.replace(/,/g, " ")},${bookmarksFolder.title}`);
    }
  }
}

// function readBookmarksFile(bookmarksFile) { }

function check404(bookmarks, bookmarksFolder) { 
  // Checking for subfolders:
  if (bookmark.children) {
    bookmark.children.forEach(extraBookmark => {
      if (extraBookmark.uri.match(/https:\/\//)) {
        checkHttpsBookmark(extraBookmark.uri, extraBookmark.title, bookmark.title);
      }
    });
  } else {
    if (bookmark.uri && bookmark.uri.match(/https:\/\//)) {
      checkHttpsBookmark(bookmark.uri, bookmark.title, bookmarksFolder.title);
    }
  }
}

function checkFbclidAndUTM(bookmarks) {
  // Checking for subfolders:
  if (bookmark.children) {
    bookmark.children.forEach(extraBookmark => {
      if (extraBookmark.uri && (extraBookmark.uri.match(/fbclid/) || extraBookmark.uri.match(/utm_/))) {
        console.log(`${extraBookmark.uri},${extraBookmark.title.replace(/,/g, " ")},${bookmark.title}`);
      } 
    });
  } else {
    // if (!bookmark.uri) {
      // console.log("weird: ", bookmark);
      // Oh...it's a "separator" line in the folders...holy shit...
    // }
    if (bookmark.uri && (bookmark.uri.match(/fbclid/) || bookmark.uri.match(/utm_/))) {
      console.log(`${bookmark.uri},${bookmark.title.replace(/,/g, " ")},${bookmarksFolder.title}`);
    } 
  }
}
