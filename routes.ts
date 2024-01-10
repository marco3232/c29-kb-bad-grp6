import { Router } from "express";
import { userRoute } from "./route/userRoute";

export const routes = Router();

routes.use("/user", userRoute);
