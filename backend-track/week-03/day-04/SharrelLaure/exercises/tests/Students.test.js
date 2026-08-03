import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import { connectDB } from "../config/db.js";
import Student from "../models/Student.js";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
});

beforeEach(async () => {
  await Student.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Students API", () => {
  test("GET /students returns an empty array", async () => {
    const res = await request(app).get("/students");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("students");
    expect(Array.isArray(res.body.students)).toBe(true);
    expect(res.body.students).toHaveLength(0);
  });

  test("POST /students creates a new student", async () => {
    const res = await request(app)
      .post("/students")
      .send({
        name: "Alice",
        score: 95,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Alice");
    expect(res.body.score).toBe(95);
    expect(res.body).toHaveProperty("_id");
  });

  test("GET /students returns all students", async () => {
    await Student.create({
      name: "John",
      score: 90,
    });

    const res = await request(app).get("/students");

    expect(res.status).toBe(200);
    expect(res.body.students).toHaveLength(1);
    expect(res.body.students[0].name).toBe("John");
  });

  test("GET /students/:id returns one student", async () => {
    const student = await Student.create({
      name: "Mary",
      score: 82,
    });

    const res = await request(app).get(`/students/${student._id}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(student._id.toString());
    expect(res.body.name).toBe("Mary");
    expect(res.body.score).toBe(82);
  });

  test("PUT /students/:id updates a student", async () => {
    const student = await Student.create({
      name: "Paul",
      score: 60,
    });

    const res = await request(app)
      .put(`/students/${student._id}`)
      .send({
        score: 99,
      });

    expect(res.status).toBe(200);
    expect(res.body.score).toBe(99);
    expect(res.body.name).toBe("Paul");
  });

  test("DELETE /students/:id deletes a student", async () => {
    const student = await Student.create({
      name: "Jane",
      score: 70,
    });

    const res = await request(app).delete(`/students/${student._id}`);

    expect(res.status).toBe(204);

    const deleted = await Student.findById(student._id);
    expect(deleted).toBeNull();
  });

  test("POST /students returns 400 for invalid input", async () => {
    const res = await request(app)
      .post("/students")
      .send({
        name: "",
        score: 150,
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /students/:id returns 404 for missing student", async () => {
    const id = new mongoose.Types.ObjectId();

    const res = await request(app).get(`/students/${id}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });

  test("PUT /students/:id returns 404 for missing student", async () => {
    const id = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/students/${id}`)
      .send({
        score: 80,
      });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });
});