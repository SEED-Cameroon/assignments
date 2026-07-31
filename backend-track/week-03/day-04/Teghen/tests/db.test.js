import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import { connectDB } from "../config/db.js";
import Student from "../models/Student.js";

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();
}, 15000);


beforeEach(async () => {
    await Student.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Students API", () => {
    test("GET /returns an empty array", async () => {
        const res = await request(server).get("/students");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("students");
        expect(Array.isArray(res.body.students)).toBe(true);
        expect(res.body.students).toHaveLength(0);
    });

    test('POST /students: a new student', async () => {
        const res = await request(server).post("/students")
            .send({
                name: "Mna",
                score: 92,
            });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("Mina");
        expect(res.body).toHaveProperty("_id")
    });

    test('GET /students returns all students', async () => {
        await Student.create({
            name: "Paul",
            score: 43
        })
        const res = await request(server).get("/students");
        expect(res.status).toBe(200)
    });

});
