var array = new Uint32Array(10);
var arr = new Int32Array(10);
var uint = new Uint16Array(15);
window.crypto.getRandomValues(uint);

console.log("\nYour lucky numbers:");
// for (var i = 0; i < array.length; i++) {
//     console.log(array[i]);
// }

for (var x of uint) {
  console.log(x);
}