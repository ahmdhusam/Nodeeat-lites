import { HttpException } from "./http.exception";
import httpStatus from "http-status";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}
