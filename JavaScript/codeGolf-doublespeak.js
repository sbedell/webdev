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

console.log(doubleSpeak("This is doublespeak"));

// Stackexchange top solution for Javascript:
let s = "This is doublespeak";
s = s.replace(/./g , c=>c+c);
console.log(s);
