function get90DaysAgo() {
  // get current date
  let date = new Date();
  date.setDate(date.getDate() - 90);

  console.log("90 days ago was: ", date);
  console.log("90 days ago was (formatted): ", date.toDateString());
  console.log("90 days ago was (other format): ", date.toLocaleString());
}
