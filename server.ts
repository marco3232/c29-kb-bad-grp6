import express, { Request, Response, response } from "express";
import { print } from "listening-on";
import { createKnex } from "./db";
import { HttpError } from "./http.error";
import { errorHandler } from "./errorHandler";
import { env } from "./env";
// import { userRoutes } from "./user.routes";
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

app.use(userRoute);
//ADD
app.get("/hi", (req: Request, res: Response) => {
  res.send("im hihi");
});

app.post("/tripplan", async(req: Request, res: Response) => {
  const { numberOfRenters, relationship, ageRange, rentalDays, rentalPurpose } =
    req.body;
  console.log("imreqbody", req.body);

  const pythonServer = "http://127.0.0.1:5000/tripplan";

  fetch(pythonServer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numberOfRenters,
      relationship,
      ageRange,
      rentalDays,
      rentalPurpose,
    }),
  })
    .then(async(response) => {
      console.log("Raw response from Python server:", response);
      return  response.json();
    })
    .then(async(data) => {
      // Process the data from the Python server
      console.log("Data from Python server:", data);
      res.json({
        success: true,
        message: "Data sent to Python server successfully",
      });
      // Insert the data into the "tripplans" table

      for (let item of data) {
        await knex("tripplans").insert({
            name: item.name,
            description: item.description,
            carparkname: item.carpark_name,
            carparklink: item.carpark_link,
            capacity: item.capacity
             });

      }
        
        
      // const tripPlansForInsert = data.map((tripPlan:any) => ({
      //   name: tripPlan.name,
      //   description: tripPlan.description,
      //   carpark_name: tripPlan.carpark_name,
      //   carpark_link: tripPlan.carpark_link,
      //   capacity: tripPlan.capacity,
      // }));
  
      // // Batch insert all trip plans into the "tripplans" table
      // await knex.batchInsert("tripplans", tripPlansForInsert);
  


      // console.log("insert??",data.description)
    })
    .catch((error) => {
      console.error("Error sending data to Python server:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
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
