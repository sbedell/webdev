var height = 2;
var width = 3;
console.log(calculateArea("3", width));
console.log("Area is: " + (height * width));
function calculateArea(height, width) {
    return height * width;
}
// Weird type tests:
var list = [1, 2, 3];
var x = function (a) { return 0; };
var y = function (b, s) { return 0; };
