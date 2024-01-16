import { NextFunction, Request, Response } from "express";
import { HttpError } from "./http.error";
import { UserService } from "./user.service";
import { knex } from "./db";

// declare module "express-session" {
//   interface SessionData {
//     id: number;
//     email?: string;
//   }
// }

export class UserController {
  private userService: UserService;
  constructor(serviceInstance: UserService) {
    this.userService = serviceInstance;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password } = req.body;
      console.log(req.method);

      let missingFields: string[] = [];

      if (!email) {
        missingFields.push("email");
        throw new HttpError(400, " missing email");
      } else {
        if (typeof email !== "string")
          throw new HttpError(400, "invalid email, expect string");
        if (email.length < 5) {
          throw new HttpError(
            400,
            "email too short, it should have at least 5 characters"
          );
        }
        if (email.length > 32) {
          throw new HttpError(
            400,
            "email too long, it should have at most 32 characters"
          );
        }
      }

      if (!password) throw new HttpError(400, "missing password");
      if (typeof password !== "string")
        throw new HttpError(400, "invalid password, expect string");

      // console.log("check controller req", email, password);
      // console.log("double check", this.userService);
      let json = await this.userService.login({ email, password });

      // console.log("from service to controller", json);
      req.session.user = {
        id: json.id,
        email: req.body.email,
      };
      req.session.save();

      res.json(json);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password, tel } = req.body;
      console.log("controller reg", req.method);

      if (!email) throw new HttpError(400, " missing email");
      if (typeof email !== "string")
        throw new HttpError(400, "invalid email, expect string");

      if (!password) throw new HttpError(400, "missing password");
      if (typeof password !== "string")
        throw new HttpError(400, "invalid password, expect string");

      let json = await this.userService.register({ email, password, tel });
      console.log("check json", json);

      res.json(json);
    } catch (error) {
      next(error);
    }
  };

  async getPublicProfile(req: Request) {
    throw new HttpError(501, "not implemented");
  }

  getUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.user) {
        return;
      }
      res.json({ message: "success id data", data: req.session.user.id });
    } catch (error) {
      next(error);
    }
  };

  getUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.user) {
        return;
      }
      res.json({
        message: "success email data",
        data: req.session.user.email,
      });
      // let json = await this.userService.getEmail({ email });
      // res.json(json);
    } catch (error) {
      next(error);
    }
  };

  tripplan = async (req: Request, res: Response) => {
    const {
      numberOfRenters,
      relationship,
      ageRange,
      rentalDays,
      rentalPurpose,
    } = req.body;
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
      .then(async (response) => {
        console.log("Raw response from Python server:", response);
        return response.json();
      })
      .then(async (data) => {
        // Process the data from the Python server
        console.log("Data from Python server:", data);

        console.log("Data from python", data);
        for (let entry of data) {
          let res = await this.userService.tripplan({
            routes: entry.routes,
            name: entry.name,
            description: entry.description,
            carpark_name: entry.carpark_name,
            carpark_link: entry.carpark_link,
            capacity: entry.capacity,
          });

          console.log("insert database result", res);
        }

        return res.status(200).json({
          success: true,
          message: "Data sent to Python server and suggestion returned successfully",
        });
      })
      .catch((error) => {
        console.error("Error sending data to Python server:", error.message);

        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  };

  logout = async (req: Request, res: Response) => {
    if (!req.session.user) {
      return;
    }
    if (!req.session.user.email) {
      res.status(401).json({ message: "you are not logged in" });
      console.log("usercon(105)-session email is:", req.session.user.email);
    } else {
      req.session.destroy(() => {
        res.json({ message: "logout success" });
      });
    }
  };
}
