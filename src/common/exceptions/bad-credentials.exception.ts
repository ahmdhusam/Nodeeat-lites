import { HttpException } from "./http.exception";
import httpStatus from "http-status";

export class BadCredentials extends HttpException {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}
