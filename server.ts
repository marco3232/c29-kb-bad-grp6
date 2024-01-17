import express, { Request, Response, response } from "express";
import { print } from "listening-on";
// import { createKnex } from "./db";
// import { HttpError } from "./http.error";
// import { errorHandler } from "./errorHandler";
import { env } from "./env";
// import { sessionMiddleware } from "./session";
// import { RequestLog } from './types'
// var request = require("request-promise");

// let knex = createKnex();
let app = express();

// app.use(sessionMiddleware);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//ADD
// import { UserService } from "./user.service";
// import { UserController } from "./user.controller";
// const userService = new UserService(knex);
// export const userController = new UserController(userService);

// import { userRoute } from "./route/userRoute";


app.use(express.static("public"));

// app.use(userRoute);
// app.get("/hi", (req: Request, res: Response) => {
//   res.send("im hihi");
// });


// app.get("/tripplan_result", async (req: Request, res: Response) => {
//   const result = await knex.select("*").from("tripplans").limit(3);
//   res.json(result)
//   console.log("DB Result", result);
// });

// app.get("/hot-picks",async(req:Request,res:Response)=>{
//   let hotPicks = await knex.select("*").from("cars").limit(4)
//   console.log("hotPicks",hotPicks)
//   res.json(hotPicks)
// })

// app.use(express.static("private"));
// app.use((req, res, next) =>
//   next(
//     new HttpError(
//       404,
//       `route not found, method: ${req.method}, url: ${req.url}`
//     )
//   )
// );

// app.use(errorHandler);

let port = env.PORT;
app.listen(port, () => {
  print(port);
});
