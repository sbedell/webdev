// ----- Example Code for redirecting requests -----

var patterns = ["*://*/*?utm_*", "*://*/*&utm_*", "*://*/*?fbclid*"];

// function redirectAndStripQueryParams(requestDetails) {
//   console.log("Redirecting: " + requestDetails.url);
//   return {
//     redirectUrl: "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif"
//   };
// }

// browser.webRequest.onBeforeRequest.addListener(
//   redirect,
//   {urls:[pattern], types:["image"]},
//   ["blocking"]
// );

// ----- Example Code for logging requests -----

// function logURL(requestDetails) {
//   console.log("Loading: " + requestDetails.url);
// }

// browser.webRequest.onBeforeRequest.addListener(
//   logURL,
//   {urls: ["<all_urls>"]}
// );
