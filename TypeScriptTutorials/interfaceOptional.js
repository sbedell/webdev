var mySearch;
// names don't need to match the interface names:
mySearch = function (src, subStr) {
    var result = src.search(subStr);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var squareOptions = { colour: "red", width: 100 };
var mySquare2 = createSquare(squareOptions);
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error! 
