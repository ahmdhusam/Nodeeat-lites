import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import winston from "winston";
import dotenv from "dotenv";
import { dbContext } from "./domain/repositry/database/db-context";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/", (req: any, res: any) => {
  res.send("HELLO");
});

// Start the server
app.listen(PORT, async () => {
  await dbContext.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  console.log(`Server is running on port ${PORT}`);
});
