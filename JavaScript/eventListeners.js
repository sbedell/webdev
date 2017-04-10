var myPara = document.getElementById("myp");
var myButton = document.getElementById("mybutton");

myPara.addEventListener("copy", textCopy);

myPara.addEventListener("click", toggleDisable);

myButton.addEventListener("click", buttonClick);

function textCopy() {
  alert("YOU COPIED THIS, YOU'VE BEEN REPORTED TO THE FBI");
}

function buttonClick() {
  alert("You clicked the button!");
  console.log("You clicked the button");
}

function toggleDisable() {
  if (myButton.getAttribute("disabled")) {
    myButton.removeAttribute("disabled");
  } else {
    myButton.setAttribute("disabled", true);
  }
}
