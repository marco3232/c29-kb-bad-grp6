import { NextFunction, Request, Response } from "express";
import { HttpError } from "./http.error";
import { UserService } from "./user.service";

declare module "express-session" {
  interface SessionData {
    id: number;
    email?: string;
  }
}

export class UserController {
  private userService: UserService;
  constructor(serviceInstance: UserService) {
    this.userService = serviceInstance;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password } = req.body;
      console.log(req.method);

      if (!email) throw new HttpError(400, " missing email");
      if (typeof email !== "string")
        throw new HttpError(400, "invalid email, expect string");

      if (!password) throw new HttpError(400, "missing password");
      if (typeof password !== "string")
        throw new HttpError(400, "invalid password, expect string");

      // console.log("check controller req", email, password);
      // console.log("double check", this.userService);
      let json = await this.userService.login({ email, password });

      // console.log("from service to controller", json);
      req.session.user = {
        id: json.id,
        username: req.body.email,
      };
      req.session.save();

      res.json(json);
    } catch (error) {
      next(error);
    }
  };
}
