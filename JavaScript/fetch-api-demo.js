/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */

function basicFetch(url) {
  fetch(url)
    // res.json or res.text are useful here:
    .then(res => res.json())
    .then(response => {
      console.log("response: ", response);
    }).catch(error => {
      console.error("[!] Error: ", error);
    }).finally(() => {
      // anything you want to run after the fetch is done. 
    });
}

// Demo Headers for Troy Hunt's Pwned Passwords demo
function fetchWithHeaders(url = "") {
  const options = {
    method: "GET",
    headers: {
      'Add-Padding': true
    }
  }
  fetch(url, options)
    .then(response => {
      console.log("response: ", response);
    }).catch(error => {
      console.error("[!] Error: ", error);
    });
}

async function fetchAsync(url, options) {
  const response = await fetch(url, options);
  return response.json();
}
