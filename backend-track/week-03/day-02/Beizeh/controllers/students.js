// Students controller — Day 10: every function now talks to Mongoose/Atlas instead
// of an in-memory array. listStudents and createStudent are SOLVED — worked together
// in the session, see LESSON.md. Everything else is your TODO, in order — see
// LESSON.md "Your Turn" for hints on each one.
//
// Every function is async, every Mongoose call is awaited inside a try/catch, and any
// caught error is forwarded with next(error) to the same central error handler from
// Day 8 — nothing about that handler changes today.

import Student from "../models/Student.js";

// ----- SOLVED -----
export async function listStudents(req, res, next) {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    next(error);
  }
}

// ----- SOLVED -----
export async function createStudent(req, res, next) {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
}

// ----- TODO Step 2: getStudent -----
// Student.findById(req.params.id). Not found (Mongoose returns null) -> build an
// Error, set err.statusCode = 404, err.message = "Student not found", and
// next(err). Found -> res.json(student). Wrap it all in try/catch, same shape as
// listStudents above.
export async function getStudent(req, res, next) {
  try {
    const student = await student.findById(req.params.id);
    res.status(201).json(student);
  } catch (err0r) {
    err.statusCode = 404;
    const err = new Error("Student not found");
    next(err)
  }
}

// ----- TODO Step 3: updateStudent -----
// Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).
// Not found -> same 404 pattern as getStudent. Found -> res.json(updatedStudent).
export async function updateStudent(req, res, next) {
   try {
    const student = await student.findByIdAndUpdate(req.params.id);
    res.status(201).json(student);
  } catch (error) {
    err.statusCode = 404;
    const err = new Error("Student not found");
    next(err)
  }
}

// ----- TODO Step 4: deleteStudent -----
// Student.findByIdAndDelete(req.params.id). Not found -> same 404 pattern. Found ->
// res.status(204).end() — no body, no .json() call.
export async function deleteStudent(req, res, next) {
    try {
    const student = await student.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    err.statusCode = 404;
    const err = new Error("Student not found");
    next(err)
  }
}