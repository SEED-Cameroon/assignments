// Exercise 4 — Biggest of three
//
// Given three numbers, print the biggest one.
// Use if / else if / else and comparison operators — no Math.max, that's not the point.
//
// Example:
//   a = 4, b = 9, c = 7  ->  9
//
// Run: node exercises/04-biggest-of-three.js

const a = 4;
const b = 9;
const c = 7;

// TODO: your code here
if(a>b && a>c)
    console.log("a is the bigest of the three")
else if(b>a && b>c)
    console.log("b is the biggest of the three")
else if(c>a && c>b)
    console.log("c is the biggest of the three")
