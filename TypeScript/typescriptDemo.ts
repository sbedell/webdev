var height : number = 2;
var width : number = 3;

console.log(calculateArea("3", width));
console.log("Area is: " + (height * width));

function calculateArea(height: number, width: number) : number {
    return height * width;
}