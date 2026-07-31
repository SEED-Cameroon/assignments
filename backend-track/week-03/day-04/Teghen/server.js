// Express entry point — Day 11.
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import studentsRouter from "./routes/students.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/students", studentsRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const firstError = Object.values(err.errors)[0].message;
    return res.status(400).json({ error: firstError });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid student id" });
  }

  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Something went wrong" });

  next();
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}


if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
