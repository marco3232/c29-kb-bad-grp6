import express, { Request, Response } from "express";
import { print } from "listening-on";
import { createKnex } from "./db";
import { HttpError } from "./http.error";
import { errorHandler } from "./errorHandler";
import { env } from "./env";
import { userRoutes } from "./user.routes";
<<<<<<< HEAD
import { UserController } from "./user.controller";
=======
import { sessionMiddleware } from "./session";
// import { RequestLog } from './types'
>>>>>>> aeff453436e29e18a93b444fe9464d15ebdebd0c

let knex = createKnex()
let app = express();

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let userService = new UserService(knex)
app.use(new UserController().router);

//ADD 
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
const userService = new UserService(knex);
export const userController = new UserController(userService);

import { userRoute } from "./route/userRoute";


app.use(userRoute);
//ADD
app.get("/hi", (req: Request, res: Response) => {
  res.send("im hihi");
});

app.use(express.static("public"));
app.use((req, res, next) =>
next(
  new HttpError(
    404,
      `route not found, method: ${req.method}, url: ${req.url}`
    )
  )
);

//moving errorHandler
app.use(errorHandler);

let port = env.PORT;
app.listen(port, () => {
  print(port);
});
