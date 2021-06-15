/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */

function basicFetch(url) {
  fetch(url).then(res => {
    if (res.ok) {
      // rest.text() is useful here too depending on what the response is.
      return res.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  }).then(response => {
    console.log("Response: ", response);
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
      'User-Agent': "Javascript Fetch API"
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
