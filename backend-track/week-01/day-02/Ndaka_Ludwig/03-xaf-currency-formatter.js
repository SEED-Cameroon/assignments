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
// Run: node exercises/03-xaf-currency-formatter.js

const amount = 1250000;

// TODO: your code here
let text = amount.toString();
let result = "";
let count = 0;

for (let i = text.length - 1; i >= 0; i--) {
    result = text[i] + result;
    count++;

    if (count == 3 && i != 0) {
        result = " " + result;
        count = 0;
    }
}

console.log(result + " XAF");
