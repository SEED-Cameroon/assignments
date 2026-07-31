// Request validators — Day 11.
// createStudentValidator and handleValidationErrors are SOLVED — worked together in
// the session, see LESSON.md "Step 4". updateStudentValidator is your TODO — see
// LESSON.md "Your Turn" Step 1.

import { body, validationResult } from "express-validator";

// ----- SOLVED -----
export const createStudentValidator = [
  body("name")
  .trim()
  .custom(value => isNaN(Number(value)))
  .withMessage("name must be a string")
  .notEmpty()
  .withMessage("name is required"),
  body("score")
    .notEmpty()
    .withMessage("score is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("score must be a number between 0 and 100"),
];

// ----- TODO Step 1: updateStudentValidator -----
// Same two fields as createStudentValidator, but a PUT here might only send one of
// them — add .optional() as the FIRST link in each chain, so a request missing
// `name` isn't rejected as if a required field were missing, only a *present but
// invalid* field should fail.
export const updateStudentValidator = [
  body("name").optional().trim().notEmpty().withMessage("name is required"),
  body("score")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("score must be a number between 0 and 100")
];

// ----- SOLVED -----
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const err = new Error(errors.array()[0].msg);
  err.statusCode = 400;
  next(err);
                                                                                                                                                                                                                                                                                                                                           
};

