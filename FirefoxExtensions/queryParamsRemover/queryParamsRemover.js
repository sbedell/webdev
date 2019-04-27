/**
 *  Remove fbclid and utm_ query params 
 */

function stripBadQueryParams(request) {
  const targetQueryParams = ["fbclid" , "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  let requestedUrl = new URL(request.url);

  let match = false;

  targetQueryParams.forEach(name => {
    if (requestedUrl.searchParams.has(name)) {
      // console.log("Requested URL with params to delete: ", request.url);
      requestedUrl.searchParams.delete(name);
      match = true;
    }
  });

  // return the stripped URL if a match is found, pass the URL on otherwise as normal (cancel: false)
  return match ? {redirectUrl: requestedUrl.href} : {cancel: false};
}

browser.webRequest.onBeforeRequest.addListener(
  stripBadQueryParams,
  {
    // Match all HTTP, HTTPS and WebSocket URLs.
    urls: ["*://*/*"]
  },
  ["blocking"]
);
