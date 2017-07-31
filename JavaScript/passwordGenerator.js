/**
 * Password generator in JS
 * 
 * Credit to: https://jsfiddle.net/Blender/ERCsD/6/
 * for the original skeleton of this code
 */

// using default parameters for max = min
String.prototype.pick = function(min, max = min) {
    let n = min + Math.floor(Math.random() * (max - min));
    let chars = '';

    for (let i = 0; i < n; i++) {
        chars += this.charAt(Math.floor(Math.random() * this.length));
    }

    return chars;
};

/**
 * Shuffle a string, basically implementation of Fisher–Yates shuffle
 * Credit to @Christoph: http://stackoverflow.com/a/962890/464744
 */
String.prototype.shuffle = function() {
    let splitString = this.split('');
    let top = splitString.length;
    let tmp, current;

    if (top) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = splitString[current];
            splitString[current] = splitString[top];
            splitString[top] = tmp;
        }
    }

    return splitString.join('');
};

// "Main Program"
const numbers = '0123456789';
const specials = "!@#$%*?_-=.:|";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = lowercase.toUpperCase();
const all = numbers + specials + lowercase + uppercase;

let password = (numbers.pick(1) + specials.pick(1) + lowercase.pick(1) + uppercase.pick(1) + all.pick(4)).shuffle();
console.log(password);
