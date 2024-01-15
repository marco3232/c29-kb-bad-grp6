import { NextFunction, Request, Response } from "express";
import { HttpError } from "./http.error";
import { UserService } from "./user.service";

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
      if(!req.session.user) {
        return;
      }
      res.json({ message: "success id data", data: req.session.user.id });
    } catch (error) {
      next(error);
    }
  };

  getUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if(!req.session.user) {
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

  logout = async (req: Request, res: Response) => {
    if(!req.session.user) {
      return;
    }
    if (!req.session.user.email) {
      res.status(401).json({ message: "you are not logged in" });
      console.log("usercon(105)-session email is:", req.session.user.email);
    } else {
      req.session.destroy((error) => {
        if (error) {
          res.status(500).json({ message: "logout failed" });
        } else {
          res.json({ message: "logout success" });
        }
      });
    }
  };
}
