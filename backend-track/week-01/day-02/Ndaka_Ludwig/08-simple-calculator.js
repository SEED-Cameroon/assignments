// Exercise 8 — Simple calculator
//
// Given two numbers and an operator ("+", "-", "*", "/"), print the result of
// applying that operator to the two numbers.
//
// Example:
//   a = 10, b = 4, operator = "*"  ->  40
//
// Hint: if / else if / else on the operator string, or a switch statement.
// Run: node exercises/08-simple-calculator.js

const a = 10;
const b = 4;
const operator = "*";

// TODO: your code here

switch(operator){
    case "+":
        console.log(`Addition gives ${a+b}`)
        break
    case "-":
        console.log(`Subbtraction gives no${a-b}`)
        break
    case "*":
        console.log(`Multiplication gives ${a*b}`)
        break
    case "/":
        console.log(`Division gives ${a/b}`)
        break
    default:
        console.log("Operator Doesnt Exists")
}


