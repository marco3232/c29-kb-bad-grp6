import { ErrorRequestHandler } from "express";
import { HttpError } from "./http.error";

export let errorHandler: ErrorRequestHandler = (
  err: HttpError,
  req,
  res,
  next
) => {
  if (!err.statusCode) console.error(err);
  res.status(err.statusCode || 500);
  let error = String(err).replace(/^(\w*)Error: /, "");
  if (req.headers.accept?.includes("application/json")) {
    res.json({ error });
  } else {
    res.end(error);
  }
};
