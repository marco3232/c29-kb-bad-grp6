import express, { Request, Response, response } from "express";
import { print } from "listening-on";
import { createKnex } from "./db";
import { HttpError } from "./http.error";
import { errorHandler } from "./errorHandler";
import { env } from "./env";
import { sessionMiddleware } from "./session";
// import { RequestLog } from './types'
var request = require("request-promise");

let knex = createKnex();
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

app.use(express.static("public"));
app.use(express.static("private"));
app.use(userRoute);
app.get("/hi", (req: Request, res: Response) => {
  res.send("im hihi");
});

app.get("/hot-picks",async(req:Request,res:Response)=>{
  let hotPicks = await knex.select("*").from("cars").limit(4)
  console.log("hotPicks",hotPicks)
  res.json(hotPicks)
})


// trip plan //
// app.post("/tripplan", async(req: Request, res: Response) => {
//   const { numberOfRenters, relationship, ageRange, rentalDays, rentalPurpose } =
//   req.body;
//   console.log("imreqbody", req.body);
  
//   const pythonServer = "http://127.0.0.1:5000/tripplan";
  
//   fetch(pythonServer, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       numberOfRenters,
//       relationship,
//       ageRange,
//       rentalDays,
//       rentalPurpose,
//     }),
//   })
//   .then(async (response) => {
//     console.log("Raw response from Python server:", response);
//     return response.json();
//   })
//   .then(async (data) => {
//     // Process the data from the Python server
//     console.log("Data from Python server:", data);
    
//     type pythonDateType = {
//       routes: number;
//       name: string;
//       description: string;
//       carpark_name: string;
//       carpark_link: string;
//       capacity: string;
//     };
    
//     for (let entry of data) {
//       await knex("tripplans").insert({
//         routes: entry.routes,
//         name: entry.name,
//         description: entry.description,
//         carparkname: entry.carpark_name,
//         carparklink: entry.carpark_link,
//         capacity: entry.capacity,
//       });
//     }
    
//     console.log("Data back from python", data);
    
//     res
//     .status(200)
//     .json({
//       success: true,
//       message: "Data sent to Python server successfully",
//     });
//   })
//   .catch((error) => {
//     console.error("Error sending data to Python server:", error.message);
    
//     res
//     .status(500)
//     .json({ success: false, message: "Internal server error" });
//   });
// });
// trip plan end//


app.get("/tripplan_result", async (req: Request, res: Response) => {
  const result = await knex.select("*").from("tripplans").limit(3);
  res.json(result)
  console.log("DB Result", result);
});




app.use((req, res, next) =>
  next(
    new HttpError(
      404,
      `route not found, method: ${req.method}, url: ${req.url}`
    )
  )
);

app.use(errorHandler);

let port = env.PORT;
app.listen(port, () => {
  print(port);
});
