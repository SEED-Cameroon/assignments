import { jest } from "@jest/globals";

await jest.unstable_mockModule("../models/Student.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = await import("../controllers/students.js");


const { default: Student } = await import("../models/Student.js");

describe("Testing Students Controller", () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {},
      body: {},
    };


    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };

    next = jest.fn();
  });

  describe("listStudents", () => {
    test("should return all students", async () => {
      const mockStudents = [{ name: "Alice", score: 60 }, { name: "Susan", score: 100 }];
      Student.find.mockResolvedValue(mockStudents);

      await listStudents(req, res, next);

      expect(Student.find).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ students: mockStudents });
      expect(next).not.toHaveBeenCalled();
    });

    test("should pass error to next() on database failure", async () => {
      const dbError = new Error("DB failure");
      Student.find.mockRejectedValue(dbError);

      await listStudents(req, res, next);

      expect(next).toHaveBeenCalledWith(dbError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("getStudent", () => {
    test("should return a student by ID (200 OK)", async () => {
      req.params.id = 123;
      const mockStudent = { _id: "123", name: "Alice" };
      Student.findById.mockResolvedValue(mockStudent);

      await getStudent(req, res, next);

      expect(Student.findById).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith(mockStudent);
      expect(next).not.toHaveBeenCalled();
    });

    test("should return 404 error if student does not exist", async () => {
      req.params.id = "nonexistent_id";
      Student.findById.mockResolvedValue(null);

      await getStudent(req, res, next);

      expect(Student.findById).toHaveBeenCalledWith("nonexistent_id");
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Student not found",
          statusCode: 404,
        })
      );
    });

    test("should pass error to next() on DB error", async () => {
      req.params.id = "123";
      const error = new Error("DB Error");
      Student.findById.mockRejectedValue(error);

      await getStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("createStudent", () => {
    test("should create and return a new student with status 201", async () => {
      req.body = { name: "Charlie", email: "charlie@example.com" };
      const createdStudent = { _id: "456", ...req.body };
      Student.create.mockResolvedValue(createdStudent);

      await createStudent(req, res, next);

      expect(Student.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdStudent);
      expect(next).not.toHaveBeenCalled();
    });

    test("should pass error to next() on failure", async () => {
      req.body = { name: "Invalid" };
      const error = new Error("Validation failed");
      Student.create.mockRejectedValue(error);

      await createStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateStudent", () => {
    test("should update and return student (200 OK)", async () => {
      req.params.id = "123";
      req.body = { name: "Alice Updated" };
      const mockUpdated = { _id: "123", name: "Alice Updated" };

      Student.findByIdAndUpdate.mockResolvedValue(mockUpdated);

      await updateStudent(req, res, next);

      expect(Student.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        req.body,
        { new: true, runValidators: true }
      );
      expect(res.json).toHaveBeenCalledWith(mockUpdated);
      expect(next).not.toHaveBeenCalled();
    });

    test("should pass 404 error to next() if student to update does not exist", async () => {
      req.params.id = "invalid_id";
      Student.findByIdAndUpdate.mockResolvedValue(null);

      await updateStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Student not found",
          statusCode: 404,
        })
      );
    });

    test("should pass error to next() on DB error", async () => {
      req.params.id = "123";
      const dbError = new Error("DB error");
      Student.findByIdAndUpdate.mockRejectedValue(dbError);

      await updateStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(dbError);
    });
  });

  describe("deleteStudent", () => {
    test("should delete student and send status 204 with empty response", async () => {
      req.params.id = "123";
      const mockDeleted = { _id: "123", name: "Alice" };

      Student.findByIdAndDelete.mockResolvedValue(mockDeleted);

      await deleteStudent(req, res, next);

      expect(Student.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    test("should pass 404 error to next() if student to delete does not exist", async () => {
      req.params.id = "invalid_id";
      Student.findByIdAndDelete.mockResolvedValue(null);

      await deleteStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Student not found",
          statusCode: 404,
        })
      );
    });

    test("should pass error to next() on DB error", async () => {
      req.params.id = "123";
      const dbError = new Error("DB error");
      Student.findByIdAndDelete.mockRejectedValue(dbError);

      await deleteStudent(req, res, next);

      expect(next).toHaveBeenCalledWith(dbError);
    });
  });
});
