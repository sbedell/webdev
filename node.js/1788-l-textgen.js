/**
 * 1 7 8 8 - L Text Generator
 * 
 * https://soundcloud.com/1788-l
 */

if (process.argv[2]) {
  const userInput = process.argv[2];

  console.log("\n" + textGen1788L(userInput));
} else {
  console.error("\n[!] Please input some text");
  console.error("[!] Expected usage:");
  console.error("[!] 'node 1788-l-textgen.js someText'");
}

function textGen1788L(text) {
  let inputText = String(text);
  let text1788L = inputText.toUpperCase().split("").join(" ");

  return text1788L;
}