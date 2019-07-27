function memeText(text) {
  let newText = "";
  
  if (text && (typeof text === "string")) {    
    let splitText = text.toLowerCase().split("");
    let counter = 0;
    
    splitText.forEach(char => {
      if (char.match(/[\w+]/)) {
        if (counter % 2 !== 0) {
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

// "Testing section"
let sampleText = "hey look...you can also call this a myspace text generator lol";
console.log(memeText(sampleText));
