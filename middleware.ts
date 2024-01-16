import { NextFunction, Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      email: string;
    };
  }
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    if (req.session.user.email) return next();
  }
  return res
    .status(401)
    .json({ message: "access denied.You are not logged in." });
}
