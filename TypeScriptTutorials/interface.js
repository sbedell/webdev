function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
var myObj2 = {
    size: 100,
    width: 50
};
printLabel(myObj);
// Would be an error since myObj2 doesn't have a label object.
// The console.log would print out "undefined"
// printLabel(myObj2);
