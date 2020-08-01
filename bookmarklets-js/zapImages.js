/**
 * Bookmarklet to remove images from a web page and replace them with their alt-text
 * This is a modification of an old bookmarklet I found on the web.
 */

(function() {
  document.querySelectorAll('img').forEach(image => {
    let altText = document.createTextNode(image.alt);
    image.parentNode.replaceChild(altText, image);
  });
})();

// One liner from above, this works:
(function(){document.querySelectorAll('img').forEach(image =>{let altText=document.createTextNode(image.alt);image.parentNode.replaceChild(altText,image);});})();
