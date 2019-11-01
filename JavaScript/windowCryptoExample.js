let uint16Arr = new Uint16Array(15);
let uint32Arr = new Uint32Array(10);

window.crypto.getRandomValues(uint32Arr);

console.log("\nYour lucky numbers:");

for (let x of uint32Arr) {
  console.log(x);
}
