import { Router } from "express";

import { knex } from "./db";
import { hashPassword } from "./hash";

export let userRoutes = Router();

userRoutes.post("/user/register", async (req, res, next) => {
  let hashed = await hashPassword(req.body.password);
  //   console.log("register:", req.body.email, req.body.password, req.body.tel);
  if (req.body.email == undefined || req.body.email == "") {
    res.status(400).json({ message: "email can not be null" });
  } else if (req.body.password == undefined || req.body.password == "") {
    res.status(400).json({ message: "password can not be null" });
  } else {
  await knex("users")
    .insert({ email: req.body.email, password: hashed, tel: req.body.tel })
    .catch((e) => console.error(e))
    .then(() => knex.destroy());
  res.json({ message: "success register" });}
});
