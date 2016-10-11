/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

let user1 = "Steve";
let user2 = "Bob";

let totalReplies = {};
let myReplies = new Map();
totalReplies[user1] = 5;
totalReplies[user2] = 10;

alert(totalReplies[user1]);
alert(totalReplies[user2]);