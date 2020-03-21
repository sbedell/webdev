/**
 * MeMe TeXtEr for node.js.
 */

function memeText(text) {
  let newText = "";
  
  if (text && (typeof text === "string")) {    
    let splitText = text.toLowerCase().split("");
    let counter = 0;
    
    splitText.forEach(char => {
      if (char.match(/[\w+]/)) {
        if (counter % 2 === 0) {
          newText += char.toUpperCase();
        } else {
          newText += char;
        }
        counter++;
      } else {
        newText += char;
      }
    });
  }

  return newText;
}

// "Main Section"
if (process.argv[2]) {
  const userInput = process.argv[2];

  console.log("\n" + memeText(userInput));
} else {
  console.error("\n[!] Please input some text");
  console.error("[!] Expected usage:");
  console.error("[!] 'node MeMeTeXtEr.js someText'");
}
