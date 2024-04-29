import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import winston from "winston";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbContext } from "./domain/repositry/database/db-context";
import { router as cartRouter } from "./domain/routes/cart.router";
import { router as userRouter } from "./domain/routes/user.router";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: "2kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/auth", userRouter);
app.use("/", (req: Request, res: Response) => {
  res.send("HELLO world any ");
});

// Express Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .send({ message: "Something went wrong. Please try again later." });
});

// Start the server
app.listen(PORT, async () => {
  await dbContext.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  console.log(`Server is running on port ${PORT}`);
});
