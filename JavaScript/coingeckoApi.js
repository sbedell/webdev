/**
 * https://www.coingecko.com/en/api
 * API Doc: https://www.coingecko.com/api/documentations/v3
 */

const baseURL = "https://api.coingecko.com/api/v3/";
let params = "";

function makeApiCall(baseURL, params) {
  fetch(baseURL + params)
  // call json function if needed:
  .then(res => res.json())
  .then(response => {
    console.log("response: ", response);
  }).catch(error => {
      console.error('Error:', error);
  }).finally(() => {
    // runs after then and catch
  });
}
