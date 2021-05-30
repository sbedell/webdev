/**
 * Read Firefox bookmarks json backup file and find all bookmarks 
 * that are http:// only and not https://
 * 
 * Now adding functionality to check if any bookmarks are not returning HTTP 200.
 */

const fs = require('fs');
const https = require("https");

const bookmarksFilename = "../../../Downloads/bookmarks-2021-05-30.json";

fs.readFile(bookmarksFilename, (err, data) => {
  if (!err) {
    let bookmarksBackup = JSON.parse(data);
    // console.log(bookmarksBackup);
    //return;

    // children[0] is the Bookmarks Menu folder
    // the children of that seems to be each folder.
    let bookmarksFolders = bookmarksBackup.children[0].children;
    
    // Printing in CSV file output, > pipe it to a csv file in the command line
    console.log("URL,Title,Folder,HTTP-Status-Code");

    bookmarksFolders.forEach(bookmarksFolder => {
      // "bookmarksFolder.title" is the folder name that the bookmarks are in
      // Here it is...the actual bookmarks, except when there are subfolders...
      let bookmarks = bookmarksFolder.children;
      if (bookmarks) {
        bookmarks.forEach(bookmark => {
          checkErrorBookmarks(bookmark, bookmarksFolder);
        });
      }
    });
  } else {
    console.error(err);
  }
});

function checkHttpsBookmark(httpsURL, urlTitle="", folderName="") {
  if (httpsURL.match(/^https:\/\//)) {
    https.get(httpsURL, response => { 
      if (response.statusCode !== 200) {
        console.log(`${httpsURL.substr(0,100)},${urlTitle.replace(/,/g, " ").substr(0,80)},${folderName},${response.statusCode}`);
      }
    }).on('error', e => {
      console.log(`Error checking ${httpsURL.substr(0,100)},${urlTitle.replace(/,/g, " ").substr(0,80)},${folderName},${e}`);
    });
  }
  // else {
  //   console.log(`Skipping - ${httpsURL},${urlTitle.replace(/,/g, " ")},${folderName}`);
  // }
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

function checkErrorBookmarks(bookmark, bookmarksFolder) { 
  // Checking for subfolders:
  if (bookmark.children) {
    bookmark.children.forEach(bookmarkChild => {
      if (bookmarkChild.uri && bookmarkChild.uri.match(/https:\/\//)) {
        checkHttpsBookmark(bookmarkChild.uri, bookmarkChild.title, bookmark.title);
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
