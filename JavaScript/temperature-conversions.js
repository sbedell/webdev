// Moving this code from my old AngularJS project. 
// Google is killing off AngularJS as of December 2021.

function convertTemp(temp, type) {
  // Old code from when I was pulling this info from an HTML page:
  // let temp = parseInt(document.getElementById("temp").value);
  
  if (isNaN(temp)) {
    console.error("Error, please enter a number.");
    return -1;
    // hideDegSymbol = true;
  } else {
    if (type === "C") {
      return Math.round((temp - 32) * (5/9)) + " " + type;
    } else if (type === "F") {
      return Math.round((temp * (9/5)) + 32) + " " + type;
    } else {
      console.error("Please input C or F for Celcius or Fahrenheit conversion.");
      return -1;
    }
    // hideDegSymbol = false;
  }
};