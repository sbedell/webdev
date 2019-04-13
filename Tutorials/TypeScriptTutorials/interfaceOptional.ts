// This demonstrates optional properties
interface SquareConfig {
    color?: string;
    width?: number;
}

// Note - variables use `const`, properties use `readonly`
interface Point {
    readonly x: number;
    readonly y: number;
}

interface searchFunction {
    (source: string, subString: string): boolean;
}

let mySearch: searchFunction;
// names don't need to match the interface names:
mySearch = function(src: string, subStr: string) {
    let result = src.search(subStr);
    if (result == -1) {
        return false;
    } else {
        return true;
    }
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!