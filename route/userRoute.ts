import { Router } from "express";
import { userController } from "../server";
import { isLoggedIn } from "../middleware";
export const userRoute = Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/email", userController.getUserEmail);
userRoute.post("/tripplan", isLoggedIn,userController.tripplan);
userRoute.get("/userid", isLoggedIn, userController.getUserId);
userRoute.get("/logout", isLoggedIn, userController.logout);
