// Testing out async / await on some demo miner functions, and timing them
const crypto = require('crypto');

/** This checks if a hash has the targeted amount of leading zeros.
 * 
 * @param {String} inputStr - the input string to hash
 * @param {int/String} nonce - the nonce to append to the string
 * @param {int} targetDifficulty - the number of leading 0s to check for
 */
function isHashOnTarget(inputStr, nonce, targetDifficulty) {
    let hash = crypto.createHash('sha256');
    let guess = `${nonce}${inputStr}`;
    let guessHash = hash.update(guess);

    let hashGuessDigest = guessHash.digest('hex');
    // console.log("Hash guess = " + hashGuessDigest);

    return hashGuessDigest.substr(0, targetDifficulty) === "0".repeat(targetDifficulty);
}

/**
 * Essentially trying to hash a leading digit "nonce" 
 * with a string to find a hash with a certain amount of leading 0s
 * @param {String} inputStr - the "proof" to hash
 * @param {int} targetDifficulty - number of leading zeros to find
 */
function testMiner(inputStr, targetDifficulty) {
    let guessNonce = 0;

    while (!isHashOnTarget(inputStr, guessNonce.toString(), targetDifficulty)) {
        guessNonce++;
    }

    //return guessNonce;
    return new Promise(resolve => {
        resolve(guessNonce);
    });
}

async function runMiner(targetDifficulty) {
    let winningNonce = await testMiner("Buy more cryptocurrency dude", targetDifficulty);

    console.log("The 'winning' nonce is : " + winningNonce);
}

// Demo to run a timer on 100 SHA-256 hash ops
console.time('100-elements-SHA-256');
for (let i = 0; i < 100; i++) {
    let hash = crypto.createHash('sha256');
    hash.update(i.toString());
    // console.log(hash.digest('hex'));
}
console.timeEnd('100-elements-SHA-256');

console.time('runMiner() - difficulty 4');
runMiner(4);
console.timeEnd('runMiner() - difficulty 4');

//console.log(testMiner("Buy more crypto!", 4));
