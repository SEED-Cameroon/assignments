// Exercise 3 — XAF currency formatter
//
// Given a number, print it formatted as XAF currency: thousands separated by a
// space, followed by " XAF".
//
// Example:
//   amount = 15000    ->  "15 000 XAF"
//   amount = 1250000  ->  "1 250 000 XAF"
//
// Hint: convert the number to a string, then walk it from the right, inserting a
// space every 3 digits. A loop + string concatenation, no built-in formatter.
// Run: node 03-xaf-currency-formatter.js

const amount = 1250000;

// TODO: your code here
let text=amount.toString();
let firstReverse=""
for (let n = text.length ; n >0 ; n--) {
    firstReverse=firstReverse+text[n-1];
}

let modified=""
for (let n = 0; n < firstReverse.length; n++) {
    if ((n+1)%3===0) {
        modified=modified+firstReverse[n]+" ";
    } else {
        modified=modified+firstReverse[n]
    }
}

let secondReverse=""
for (let n = modified.length ; n >0 ; n--) {
    secondReverse=secondReverse+modified[n-1];
}

let finalAmount = secondReverse + ' XAF';

console.log(`${finalAmount}`)
