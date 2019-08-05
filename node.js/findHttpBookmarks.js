/**
 * Goal - read my bookmarks json backup file and find all bookmarks 
 *        that are http:// only and not https://
 */

const fs = require('fs');

const bookmarksFilename = "../../../../Downloads/bookmarks-2019-08-04.json";

fs.readFile(bookmarksFilename, (err, data) => {
  if (!err) {
    let bookmarksBackup = JSON.parse(data);
    // console.log(bookmarksBackup);

    // children[0] is the Bookmarks Menu folder
    // the children of that seems to be each folder
    // console.log(bookmarksBackup.children[0].children);

    // let httpCount = 0;
    let bookmarksFolders = bookmarksBackup.children[0].children;
    
    // Printing in CSV file output, > pipe it to a csv file in the command line
    console.log("URL,Title,Folder");
    bookmarksFolders.forEach(bookmarksFolder => {
      // "bookmarksFolder.title" is the folder name that the bookmarks are in
      // Here it is...the actual bookmarks, except when there are subfolders...
      let bookmarks = bookmarksFolder.children;
      if (bookmarks) {
        bookmarks.forEach(bookmark => {
          if (bookmark.children) {
            // console.log("children: ", bookmark.children);
            // these are all bookmarks too...unless there are more subfolders...
            bookmark.children.forEach(extraBookmark => {
              //console.log(`title: ${extraBookmark.title} \t URL: ${extraBookmark.uri}`);
              if (extraBookmark.uri.match(/http:\/\//)) {
                // httpCount++;
                console.log(`${extraBookmark.uri},${extraBookmark.title.replace(/,/g, " ")},${bookmark.title}`);
              }
            });
          } else {
            //console.log(`title: ${bookmark.title} \t URL: ${bookmark.uri}`);
            if (bookmark.uri && bookmark.uri.match(/http:\/\//)) {
              // HTTP bookmark found!
              // httpCount++;
              console.log(`${bookmark.uri},${bookmark.title.replace(/,/g, " ")},${bookmarksFolder.title}`);
            }
          }
        });
      } 
      // else {
      //   console.error("No children elements found.");
      // }
    });
  } else {
    console.error(err);
  }
});
