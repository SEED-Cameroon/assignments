// Exercise 10 — Multiplication table
//
// Given a number, print its multiplication table from 1 to 10.
//
// Example, for number = 6:
//   6 x 1 = 6
//   6 x 2 = 12
//   ...
//   6 x 10 = 60
//
// Hint: a single for loop from 1 to 10, same shape as FizzBuzz's loop.
// Run: node 10-multiplication-table.js

const number = 6;

// TODO: your code here
for (let n = 1; n < 11; n++) {
    console.log(`${number} * ${n} = ${n*number}`)    
}
