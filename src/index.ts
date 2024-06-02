import "reflect-metadata";
import { dbContext } from "./domain/repositry/database/db-context";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbContext } from "./domain/repositry/database/db-context";
import { router as cartRouter } from "./domain/routes/CartRouter";
import { router as orderRouter } from "./domain/routes/OrderRouter";
import { router as userRouter } from "./domain/routes/user.router";
import hpp from "hpp";

import { routes } from "./domain/routes/routes.index";
import { initializeTransactionalContext } from "typeorm-transactional";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: "2kb" }));
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", userRouter);
app.use("/", routes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    message: req.url + " Not Found",
  });
});
// Express Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // TODO: Use winston for logging
  console.log("Global Error Handler: ");
  console.error(err);
  res
    .status(500)
    .send({ message: "Something went wrong. Please try again later." });
});
// Routes
app.use("/", routes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
// app.use("/", (req: Request, res: Response) => {
//   res.send("HELLO world any a ");
// });

// Start the server
app.listen(PORT, async () => {
  await dbContext.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  process.exit(); // exit the process to avoid unknown state
});
