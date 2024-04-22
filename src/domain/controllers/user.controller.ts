import { Request, Response } from "express";
import { HttpException } from "../../common/exceptions";
import { userService } from "../service/user.service";
import {
  UserSchemaCreate,
  UserSchemaLogin,
} from "../../common/schemas/user.schema";
import httpStatus from "http-status";

interface Requests extends Request {
  user: any;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  try {
    const { username, email, first_name, last_name, password } = req.body;
    const data: UserSchemaCreate = {
      username,
      email,
      first_name,
      last_name,
      password,
    };
    const user = await userService.register(data);

    res.status(httpStatus.CREATED).json(user);
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data: UserSchemaLogin = {
      email,
      password,
    };
    const access_token = await userService.login(data);
    res.cookie("access_token", access_token);
    res.status(httpStatus.OK).json({ access_token });
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { reset_token } = req.params;
  try {
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const sendVerifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token }: any = req.query;
  console.log(token);
  try {
    await userService.verify_account(token);
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await userService.myProfile(req.body.user);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};

export const disable = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({});
  } catch (error: any) {
    if (error instanceof HttpException) {
      res.status(error.status).json({ error: error.message });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong. Please try again later" });
    }
  }
};
