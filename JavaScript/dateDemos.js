// Get today's date
let today = new Date();

// 90 days ago:
let oldDate = new Date();
oldDate.setDate(today.getDate() - 90);
console.log("90 days ago was: ", oldDate);
console.log("90 days ago was (formatted): ", oldDate.toDateString());
console.log("90 days ago was (other format): ", oldDate.toLocaleString());
