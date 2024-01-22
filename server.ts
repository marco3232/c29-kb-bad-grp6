import express, { Request, Response } from "express";
import { print } from "listening-on";
import { createKnex } from "./db";
import { HttpError } from "./http.error";
import { errorHandler } from "./errorHandler";
import { env } from "./env";
import { sessionMiddleware } from "./session";

var request = require("request-promise");

let knex = createKnex();
let app = express();

// app.use //
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// user route and controller end //

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
const userService = new UserService(knex);
export const userController = new UserController(userService);

import { userRoute } from "./route/userRoute";
import { tripRoute } from "./route/tripRoute";

app.get("/hi", (req: Request, res: Response) => {
  res.send("im hihi");
});

app.use("/user", userRoute);
app.use((req,res,next)=>{
  console.log("456")
  next()
},tripRoute);

app.use(express.static("private"));

app.use((req, res, next) => {
  console.log("123");
  next(
    new HttpError(
      404,
      `route not found, method: ${req.method}, url: ${req.url}`
    )
  );
});

app.use(errorHandler);

let port = env.PORT;
app.listen(port, () => {
  print(port);
});
