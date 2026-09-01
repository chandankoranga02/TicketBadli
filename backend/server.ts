require("dotenv").config();
// Package imported
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",")
      : true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/server", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.code === "P2002") {
    return res
      .status(409)
      .json({
        success: false,
        message: "A record with those details already exists.",
      });
  }
  if (error instanceof SyntaxError) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request body." });
  }
  console.error(error);
  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: error.message || "Internal server error",
    });
});

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
