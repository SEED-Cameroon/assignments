// Exercise 6 — Sum of digits
//
// Given a positive whole number, print the sum of its digits.
//
// Example:
//   n = 1234  ->  1 + 2 + 3 + 4 = 10
//
// Hint: a while loop. Each pass: take the last digit with n % 10, add it to a
// running total, then drop that digit with n = Math.floor(n / 10). Stop when n is 0.
// Run: node 06-sum-of-digits.js

const n = 12348;

// TODO: your code here
let string=n.toString();
let sum=0;
for (let i = string.length ; i > 0 ; i--) {
    let number = Number(string[i-1]);
    sum=sum+number;
}

console.log(`${sum}`);
