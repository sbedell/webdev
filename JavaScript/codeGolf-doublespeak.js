/**
 * https://codegolf.stackexchange.com/questions/188988/ddoouubbllee-ssppeeaakk
 * 
 * * Write code which accepts one argument, a string.
 * * It will modify this string, duplicating every character.
 * * Then it will return the double speak version of the string.
 * * It's code golf, try to achieve this in the smallest number of bytes.
 * * Please include a link to an online interpreter for your code.
 * * Input strings will only contain characters in the printable ASCII range. 
 */

// My first naive solution:
function doubleSpeak(str) {
  let doublespeak = "";
  [...str].forEach(char => { doublespeak += (char+char); });
  return doublespeak;
}

// Stackexchange top solution for Javascript:
function doubleSpeakSOflow(str) {
  return str.replace(/./g, c=>c+c);
}

let testString = "This is doublespeak";

console.log(doubleSpeak(testString));
console.log(doubleSpeakSOflow(testString));
console.assert(doubleSpeak(testString) === doubleSpeakSOflow(testString));

// Stackexchange top solution one liner for Javascript:
// let s = testString.replace(/./g , c=>c+c);
// console.log(s);

// console.log(doubleSpeakSOflow(doubleSpeakSOflow(doubleSpeakSOflow(testString))));
