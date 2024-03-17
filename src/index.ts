import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import winston from "winston";
import dotenv from "dotenv";
import { dbContext } from "./domain/repositry/database/db-context";
import { router as cartRouter } from "./domain/routes/cart.router";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/carts", cartRouter);
app.use("/", (req: any, res: any) => {
  res.send("HELLO world any ");
});

// Start the server
app.listen(PORT, async () => {
  await dbContext.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  console.log(`Server is running on port ${PORT}`);
});
