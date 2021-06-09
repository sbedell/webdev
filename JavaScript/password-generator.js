/**
 * Password generator in JS
 * 
 * Credit to: https://jsfiddle.net/Blender/ERCsD/6/
 * for the original skeleton of this code
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
 * Credit to @Christoph: http://stackoverflow.com/a/962890/464744
 */
 function shuffleString(inputStr) {
  if (inputStr) {
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
  } else {
    return "";
  }
}

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

console.log(generateRandomPassword(15));