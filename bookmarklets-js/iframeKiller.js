/**
 * Bookmarklet to remove iframes
 */

// The original:
// javascript:void(function(){setInterval(function(){document.querySelectorAll('iframe').forEach(function(element){console.log('Iframe Killa - Removing Element:', element);element.parentNode.removeChild(element);})},100)}());

// My edit: ( Changed element.parentNode.removeChild(element) to element.remove() and removed the setInterval )
// javascript:void(function(){document.querySelectorAll('iframe').forEach(function(element){console.log('Iframe Killa - Removing Element:', element);element.remove()})}());

// Readable function (why even set an interval? for recurring iframes? how common is that?)
function iframeKiller() {
  //setInterval(function() {
  document.querySelectorAll('iframe').forEach(element => {
    console.log('Iframe Killa - Removing Element:', element);
    element.remove();
  });
  // }, 100);
}
