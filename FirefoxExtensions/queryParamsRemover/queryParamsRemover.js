/**
 *  Remove fbclid and utm_ query params 
 */

function stripBadQueryParams(request) {  
  const targetQueryParams = ["fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_referrer"];

  let requestedUrl = new URL(request.url);
  let match = false;

  targetQueryParams.forEach(name => {
    if (requestedUrl.searchParams.has(name)) {
      requestedUrl.searchParams.delete(name);
      match = true;
    }
  });

  // return the stripped URL if a match is found, pass the URL on otherwise as normal (cancel: false)
  return match ? {redirectUrl: requestedUrl.href} : {cancel: false};
}

// Could add this to the filter as well: types: ['main_frame', 'sub_frame']

browser.webRequest.onBeforeRequest.addListener(
  stripBadQueryParams,
  {
    // Match all HTTP and HTTPS URLs.
    urls: ["http://*/*", "https://*/*"]
  },
  ["blocking"]
);
