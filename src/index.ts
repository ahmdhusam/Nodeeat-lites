import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import dotenv from "dotenv";
import { dbContext } from "./domain/repositry/database/db-context";
import { routes } from "./domain/routes/routes.index";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/", routes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
// app.use("/", (req: Request, res: Response) => {
//   res.send("HELLO world any a ");
// });

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

// Start the server
app.listen(PORT, async () => {
  await dbContext.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  console.log(`Server is running on port ${PORT}`);
});
