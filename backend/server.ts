require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { prisma } = require("./lib/prisma");
import type { Request, Response } from "express";
const redis = require("./src/config/redis")

// Routes imports
const Authentication = require("./src/modules/authentication/auth.router");
const listening = require("./src/modules/listening/router")

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/server", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

// Routes
app.use("/api/v1/auth", Authentication);
app.use("/api/v1/listen" , listening);





async function startServer() {
  try {
    await prisma.$connect();
    await redis.connect();

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
