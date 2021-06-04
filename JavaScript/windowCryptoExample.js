/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
 * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 */

let uint16Arr = new Uint16Array(15);
let uint32Arr = new Uint32Array(10);

getCryptoRandomValues(uint32Arr);

function getCryptoRandomValues(typedArray) {
  if (!window.isSecureContext) { console.error("Not secure context!"); }

  if (window.crypto) {
    // window.crypto.getRandomValues modifies the array itself, returns nothing.
    window.crypto.getRandomValues(typedArray);
    console.log(typedArray);
  } else {
    console.error("window.crypto not supported");
  }
}

function generateRSAKey() {
  window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,                   // boolean whether or not to make the keys extractable / exportable
    ["encrypt", "decrypt"]   // key usages
  ).then(keyPair => {
    console.log("keyPair.publicKey: ", keyPair.publicKey);
    console.log("keyPair.privateKey: ", keyPair.privateKey);
  });
}
