/**
 * Credit to: https://jsfiddle.net/Blender/ERCsD/6/
 * for the original skeleton of this code, the "pick" function.
 * 
 * @param {String} inputStr - String to pick characters from.
 * @param {Number} numChars - amount of characters to pick from the string.
 * @returns {String} - Randomly selected characters. 
 */
function pickCharsFromString(inputStr, numChars = 0) {
  let chars = "";

  for (let i = 0; i < numChars; i++) {
    chars += inputStr.charAt(Math.floor(Math.random() * inputStr.length));
  }

  return chars;
}

/**
 * Shuffle a string, basically implementation of Fisher–Yates shuffle
 * Credit to @Christoph: https://stackoverflow.com/a/962890/464744
 *
 * @param {String} inputStr - String to shuffle / randomize.
 * @return {String} - shuffled string.
*/
function shuffleString(inputStr) {
  if (!inputStr) { return ""; }
  
  let splitString = inputStr.split("");
  let top = splitString.length;
  let tmp, current;

  while (--top) {
    //console.log("top: ", top);
    current = Math.floor(Math.random() * (top + 1));
    //console.log("Current: ", current);
    tmp = splitString[current];
    splitString[current] = splitString[top];
    splitString[top] = tmp;
    //console.log("shuffling string: ", splitString.join(""));
  }

  return splitString.join("");
}

/**
 * Generate a secure random password.
 * 
 * @param {Number} length - length of the password to generate.
 * @returns {String} - Shuffled password.
 */
function generateRandomPassword(length = 12) {
  const numbers = '0123456789';
  // const allSpecialChars = '~!@#$%^&*()_+=-"|\/<>.,?';
  // const trimmedListOfSpecials = "!@#$%*?_-=.:|";
  const specialCharsSafe = "!@#$%^&*-_=+?";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = lowercase.toUpperCase();
  const allChars = numbers + specialCharsSafe + lowercase + uppercase;

  let password = (pickCharsFromString(numbers, 1) + pickCharsFromString(specialCharsSafe, 1) + pickCharsFromString(lowercase, 1) + pickCharsFromString(uppercase, 1) + pickCharsFromString(allChars, length - 4));
  
  return shuffleString(password);
}


// --------------- Some "tests": ------------------
let testString = "thisteststring";
let pickChars = pickCharsFromString(testString, 30);
let shuffledString = shuffleString(testString);
// console.log(shuffledString);

// Test length is what I picked above, 30
console.assert(pickChars.length === 30); 

// Test that each char is in fact from the initial string
pickChars.split("").forEach(char => {
  console.assert(testString.includes(char));
});

// Test that the shuffled string function works correctly:
console.assert(shuffledString.length === testString.length);

// Test that the shuffled string is in fact different then the test string.
console.assert(shuffledString !== testString);

// Test to make sure all the chars are from the initial string.
shuffledString.split("").forEach(char => {
  console.assert(testString.includes(char));
});

let password = generateRandomPassword(15);
console.assert(password.length === 15, "password length not 15");
console.log(password);
