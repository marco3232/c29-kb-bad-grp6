import express, { Request, Response } from "express";
import { print } from "listening-on";
import { createKnex } from "./db";
import { HttpError } from "./http.error";
import { errorHandler } from "./errorHandler";
import { env } from "./env";
// import { userRoutes } from "./user.routes";
import { sessionMiddleware } from "./session";
// import { RequestLog } from './types'

let knex = createKnex()
let app = express();

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



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

app.post("/tripplan",(req:Request,res:Response)=>{
  const{numberOfRenters,relationship,ageRange,rentalDays,rentalPurpose} = req.body
  console.log("imreqbody",req.body)
})

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
