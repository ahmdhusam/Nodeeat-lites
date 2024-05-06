import { HttpException } from "./http.exception";
import { StatusCodes } from "http-status-codes";

export class ResourceLockedException extends HttpException {
  constructor(message: string) {
    super(message, StatusCodes.LOCKED);
  }
}
