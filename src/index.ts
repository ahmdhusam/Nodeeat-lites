import { dbContext } from "./domain/repositry/database/db-context";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import httpStatus from "http-status";
import morgan from "morgan";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import dotenv from "dotenv";

import { routes } from "./domain/routes/routes.index";
import { initializeTransactionalContext } from "typeorm-transactional";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// Express Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
