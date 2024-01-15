import { NextFunction, Request, Response } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return;
  }
  if (req.session.user.email) {
    next();
  } else {
    res.status(401).json({ message: "access denied.You are not logged in." });
  }
}
