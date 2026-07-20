// Exercise 4 — Biggest of three
//
// Given three numbers, print the biggest one.
// Use if / else if / else and comparison operators — no Math.max, that's not the point.
//
// Example:
//   a = 4, b = 9, c = 7  ->  9
//
// Run: node 04-biggest-of-three.js

const a = 4;
const b = 9;
const c = 7;

// TODO: your code here
if (a>b && a>b) {
    console.log(`${a} is the largest`);
} 
else if (b>a && b>c) {
    console.log(`${b} is the largest`);
} 
else if (c>a && c>b) {
    console.log(`${c} is the largest`);
} else {
    console.log(`They are all equal`);  
} 