// Students router — full CRUD, mounted at /students in server.js
// GET /students (list) and POST /students (create) are SOLVED — worked together in
// the session, see LESSON.md. Everything else is your TODO, in order — see LESSON.md
// "Your Turn" for hints on each one.

const express = require("express");
const router = express.Router();

function validateStudent(req, res, next) {
  const { name, score } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Name must be a non-empty string",
    });
  }

  if (typeof score !== "number") {
    return res.status(400).json({
      error: "Score must be a number",
    });
  }

  next();
}

let students = [
  { id: 1, name: "Ada", score: 91 },
  { id: 2, name: "Kofi", score: 68 },
  { id: 3, name: "Zara", score: 84 },
];
let nextId = 4;

// ----- SOLVED: GET /students — list everyone -----
router.get("/", (req, res) => {
  // TODO (Step 1 of "Your Turn"): support "?minScore=" filtering with req.query.
  const { minScore } = req.query;
  let results = students;
  if (minScore !== undefined) {
    const min=Number(minScore);
    results = students.filter((student) => student.score >= min);
  }
  // Example: GET /students?minScore=80 should only return Ada and Zara.
  res.json({ students:results });

});

// ----- TODO Step 2: GET /students/:id — one student -----
router.get("/:id", (req, res) => {
 const student = students.find((student) => student.id === Number(req.params.id));

 if (student!== undefined) {
  res.status(200).json(student);
 } else {
  res.status(404).json({ error: "Student not found" });
 }
});
// Use req.params.id (it arrives as a STRING — Number() it before comparing).
// Found -> 200 with the student. Not found -> 404 with { error: "Student not found" }.

// ----- SOLVED: POST /students — create -----
router.post("/", validateStudent, (req, res) => {
  const { name, score } = req.body;
  const newStudent = { id: nextId++, name, score };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ----- TODO Step 3: PUT /students/:id — update -----
router.put("/:id", validateStudent, (req, res) => {
  const student = students.find((student) => student.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const { name, score } = req.body;
  student.name = name;
  student.score = score;
  res.status(200).json(student);
});
// Find the student by req.params.id (404 if missing, same as Step 2). If found,
// overwrite its name/score from req.body and respond 200 with the updated student.

// ----- TODO Step 4: DELETE /students/:id — remove -----
router.delete("/:id", (req, res) => {
  const index = students.findIndex((student) => student.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  students.splice(index, 1);
  res.status(204).send();
});
// to remove it with .splice(). Not found -> 404. Found -> remove it and respond 204
// with NO body (see LESSON.md for why 204 has no res.json() call at all).

// ----- TODO Step 5: validation middleware -----

// Write a function validateStudent(req, res, next) that checks req.body.name is a
// non-empty string and req.body.score is a number — respond 400 with a clear error
// message if not, otherwise call next(). Apply it to BOTH this file's POST route
// and the PUT route you wrote in Step 3, e.g.:
//   router.post("/", validateStudent, (req, res) => { ... });

module.exports = router;
