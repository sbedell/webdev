/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 */

let uint16Arr = new Uint16Array(15);
let uint32Arr = new Uint32Array(10);

getCryptoRandomValues(uint32Arr);

function getCryptoRandomValues(typedArray) {
  if (window.crypto) {
    // window.crypto.getRandomValues modifies the array itself, returns nothing.
    window.crypto.getRandomValues(typedArray);
    return typedArray;
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

async function sha1HashAsync(userInput) {
  if (window.isSecureContext) {
    // encode as (utf-8) Uint8Array, then hash it.
    const msgUint8 = new TextEncoder().encode(userInput);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);

    // Convert buffer to byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // console.log("hashArray: ", hashArray);

    // Convert bytes to hex string: (toString(16) is using radix 16)
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}

function sha1Hash(userInput) {
  if (window.isSecureContext) {
    const encoder = new TextEncoder();
    const data = encoder.encode(userInput);
    crypto.subtle.digest('SHA-1', data).then(hashBuffer => {
      // Convert to hex digest:
      const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
      console.log(`SHA-1 hex digest of ${userInput}:\n${hashHex}`);
    });
  }
}
