// Exercise 2 — Top student
//
// Given the same students array, write a function topStudent(students) that
// returns the student object with the highest score.
//
// Example:
//   topStudent(students)  ->  { name: "Ada", score: 91 }
//
// Hint: no built-in "max of objects" — loop through, or use .reduce(), keeping
// track of whichever student has the highest score seen so far.
// Run: node exercises/02-top-student.js

const students = [
  { name: "Ada", score: 91 },
  { name: "Kofi", score: 68 },
  { name: "Zara", score: 814 },
];

function topStudent(students) {
  // TODO: your code here
  const scores = students.map((s) => s.score);
  highest=students[0];

  for (let i = 0; i < students.length; i++) {
    if (students[i].score > highest.score ) {
      highest= students[i]
    }    
  }
 
  return highest
    
  // length = students.length;

}

console.log("Top student:", topStudent(students));

// node 02-top-student.js