import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import { connectDB } from "../config/db.js";
import * as Studentcontroller from "../controllers/students.js"

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();
}, 15000);


afterAll(async () => {
    await mongoose.connection.close();
});

describe('Testing listStudents', () => {
    test('List all Students', async () => {
        const res = await request(server).get("/students");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.students)).toBe(true);
    });
});
