// Exercise 5 — Even or odd
//
// Given a number, print "Even" or "Odd".
// Hint: the same modulo operator from FizzBuzz. n % 2 === 0 means no remainder.
//
// Example:
//   n = 7  ->  "Odd"
//
// Run: node 05-even-or-odd.js

const n = 7;

// TODO: your code here
if (n%2===0) {
    console.log(`${n} is an even number`)
} else {
    console.log(`${n} is an odd number`)
}