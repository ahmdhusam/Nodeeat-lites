import { Router, Request, Response } from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/user.middleware";

export const router: Router = Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/forget-password").post(userController.forgetPassword);
router.route("/reset-password/:reset_token").post(userController.resetPassword);
router.route("/send-verify-token").post(userController.sendVerifyToken);
router.route("/verify-account").get(userController.verifyAccount);
router.route("/me").get(verifyToken, userController.myProfile);
router.route("/logout").get(userController.logout);
router.route("/disable").post(userController.disable);
