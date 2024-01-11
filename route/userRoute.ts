import { Router } from "express";
import { userController } from "../server";
export const userRoute = Router();

userRoute.post("/user/login", userController.login);
userRoute.post("/user/register", userController.register);