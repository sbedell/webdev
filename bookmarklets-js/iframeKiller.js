/**
 * Bookmarklet to remove iframes
 */

// The original:
// javascript:void(function(){setInterval(function(){document.querySelectorAll('iframe').forEach(function(element){console.log('Iframe Killa - Removing Element:', element);element.parentNode.removeChild(element);})},100)}());

// My edit: ( Changed element.parentNode.removeChild(element) to element.remove() and removed the setInterval )
//javascript:
(function(){document.querySelectorAll('iframe').forEach(element =>{console.log('Iframe Killer - Removing Element:', element);element.remove()})})();

// Readable function:
function iframeKiller() {
  let count = 0;
  document.querySelectorAll('iframe').forEach(element => {
    console.log('Iframe Killer - Removing Element:', element);
    element.remove();
    count++;
  });
  console.log(`Iframe Killer: Removed ${count} iframes from the page.`);
}
