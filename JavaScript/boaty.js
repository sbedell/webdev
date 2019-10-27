/* Code Golf:
 * https://codegolf.stackexchange.com/questions/160438/facey-mcfaceface
 */

function mcBoatFace(string) {
    string = string.charAt(0).toUpperCase() + string.substr(1).toLowerCase(); // format it to first char uppercase

    let firstPart = "";
    let secondPart = "";

    if (string.substr(-2) == "ey") {
        firstPart = string;
        secondPart = "Mc" + string.slice(0, -2) + "face"; // strips last 2 chars off
    } else if (string.substr(-1) == "y") {
        firstPart = string;
        secondPart = "Mc" + string.slice(0, -1) + "face"; // strips off the y, the last char
    } else {
        firstPart = string + "y";
        secondPart = "Mc" + string + "face";
    }

    return firstPart + " " + secondPart;
}

function boatyGolf(s) {
    return `${s=s[0].toUpperCase()+s.slice(1).toLowerCase().replace(/y$/,'')}y Mc${s.replace(/e$/,``)}face`;
}
// "Testing":
console.log(mcBoatFace("boat"));
console.log(mcBoatFace("Face"));
console.log(mcBoatFace("DOG"));
console.log(mcBoatFace("Family"));
console.log(mcBoatFace("Lady"));
console.log(mcBoatFace("Donkey"));
console.log(mcBoatFace("Player"));

console.log(boatyGolf("boat"));
console.log(boatyGolf("Lady"));
console.log(boatyGolf("Donkey"));
console.log(boatyGolf("dog"));

// Appears to be true:
console.assert(mcBoatFace("dog") == boatyGolf("dog"));