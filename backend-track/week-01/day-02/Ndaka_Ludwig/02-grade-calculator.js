// Exercise 2 — Grade calculator
//
// Given a numeric score (0-100), print the letter grade:
//   90-100 -> "A"
//   80-89  -> "B"
//   70-79  -> "C"
//   60-69  -> "D"
//   below 60 -> "F"
//
// Example:
//   score = 84  ->  "B"
//
// Same shape as FizzBuzz: pick a value, then an ordered if / else if / else.
// Run: node exercises/02-grade-calculator.js


const score = 84
// TODO: your code here

if(score<=100 && score>=90)
    console.log("A")
else if(score<=89 && score>=80)
    console.log("B")
else if(score<=79 && score>=70)
    console.log("C")
else if(score<=69 && score>=60)
    console.log("D")
else if(score<=69 && score>=60)
    console.log("F")