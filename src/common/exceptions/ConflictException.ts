import httpStatus from "http-status";
import { HttpException } from ".";

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, httpStatus.CONFLICT);
  }
}
