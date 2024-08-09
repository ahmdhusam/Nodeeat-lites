import { HttpException } from "./http.exception";
import httpStatus from "http-status";

export class EmailDeleted extends HttpException {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
  }
}
