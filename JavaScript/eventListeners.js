var toggle = false;
var myp = document.getElementById("myp");
var myb = document.getElementById("mybutton");

myp.addEventListener("copy", function() {
  alert("YOU COPIED THIS, YOU'VE BEEN REPORTED TO THE FBI");
});

myp.addEventListener("click", toggleTitle);

myp.addEventListener("click", toggleDisable);

function toggleTitle() {
  if (toggle) {
    myp.setAttribute("title", "HERE IS A TITLE ELEMENT");
    toggle = false;
  } else {
    myp.removeAttribute("title");
    toggle = true;
  }
}

function toggleDisable() {
  if (mybutton.getAttribute("disabled")) {
    mybutton.removeAttribute("disabled");
  } else {
    mybutton.setAttribute("disabled", true);
  }
}
