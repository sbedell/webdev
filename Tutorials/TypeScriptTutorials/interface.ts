interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
let myObj2 = {
    size: 100,
    width: 50
};

printLabel(myObj);

// Would be an error since myObj2 doesn't have a label object.
// The console.log would print out "undefined"
// printLabel(myObj2);
