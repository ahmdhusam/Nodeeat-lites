import { HttpException } from "./http.exception";
import { getReasonPhrase } from "http-status-codes";
export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}
