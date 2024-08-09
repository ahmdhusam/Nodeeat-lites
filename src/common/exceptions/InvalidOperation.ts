import { HttpException } from "./http.exception";
import { StatusCodes } from "http-status-codes";

export class InvalidOperation extends HttpException {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
