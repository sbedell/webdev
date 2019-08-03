/**
 * Goal - read my bookmarks json backup file and find all bookmarks 
 *        that are http:// only and not https://
 */

const fs = require('fs');

const bookmarksFilename = "../../../../Downloads/bookmarks-2019-08-03.json";

fs.readFile(bookmarksFilename, (err, data) => {
  if (!err) {
    let bookmarksBackup = JSON.parse(data);
    // console.log(bookmarksBackup);

    // children[0] is the Bookmarks Menu folder
    // the children of that seems to be each folder
    // console.log(bookmarksBackup.children[0].children);

    let bookmarksFolders = bookmarksBackup.children[0].children;
    bookmarksFolders.forEach(bookmarksFolder => {
      // console.log("Folder Name: ", bookmarksFolder.title);
      // Here it is...the actual bookmarks, except when there are subfolders...
      let bookmarks = bookmarksFolder.children;
      // console.log(bookmarks);
      if (bookmarks) {
        bookmarks.forEach(bookmark => {
          if (bookmark.children) {
            // console.log("children: ", bookmark.children);
            // these are all bookmarks too...unless there are more subfolders...
            bookmark.children.forEach(extraBookmark => {
              //console.log(`title: ${extraBookmark.title} \t URL: ${extraBookmark.uri}`);
              if (extraBookmark.uri.match(/http:\/\//)) {
                console.log(`[!] HTTP Bookmark found! ${extraBookmark.uri} \t-\t Folder ${bookmark.title}`);
              }
            });
          } else {
            //console.log(`title: ${bookmark.title} \t URL: ${bookmark.uri}`);
            if (bookmark.uri && bookmark.uri.match(/http:\/\//)) {
              console.log(`[!] HTTP Bookmark found: ${bookmark.uri} \t-\t Folder: ${bookmarksFolder.title}`);
            }
          }
        });
      }
    });
  } else {
    console.error(err);
  }
});

// ** OLD code for reading in from the command line **
// if (!process.argv[2]) {
//   console.error("\nPlease input a filename");
//   return;
// } else {
  // const filename = process.argv[2];
// }