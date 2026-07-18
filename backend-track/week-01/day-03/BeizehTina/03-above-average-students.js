
const students = [
  { name: "Ada", score: 91 },
  { name: "Kofi", score: 68 },
  { name: "Zara", score: 84 },
];

function average(students) {
  const scores = students.map((s) => s.score);
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
  
}


function aboveAverage(students) {
  // TODO: your code here
  const avg = average(students);
  // const scores = students.map((s) => s.score);
  const above = students.filter((s)=> s.scores > avg);
  return above;
  return above;

}

console.log("Above average:", aboveAverage(students));