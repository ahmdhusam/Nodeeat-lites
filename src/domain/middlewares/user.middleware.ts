import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../service/user.service";
import httpStatus from "http-status";

interface Requests extends Request {
  user: any;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ message: "Token is not provided" });
  }

  jwt.verify(token, userService.secretKey, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    console.log(decoded.data.sub);
    req.body.user = decoded.data.sub;
    next();
  });
};
