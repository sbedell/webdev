var height : number = 2;
var width : number = 3;

console.log(calculateArea("3", width));
console.log("Area is: " + (height * width));

function calculateArea(height: number, width: number) : number {
    return height * width;
}

// Weird type tests:
let list: number[] = [1, 2, 3];

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;