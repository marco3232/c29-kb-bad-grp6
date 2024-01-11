// import { Router } from "express";

// import { hashPassword } from "./hash";
// import { knex } from "./db";

// export let userRoutes = Router();

// userRoutes.post("/user/register", async (req, res, next) => {
//   if (req.body.email == undefined || req.body.email == "") {
//     res.status(400).json({ message: "email can not be null" });
//   } else if (req.body.password_hash == undefined || req.body.password_hash == "") {
//     res.status(400).json({ message: "password can not be null" });
//   } else {
//     let result = await knex("users")
//       .select("id")
//       .where("email", req.body.email);
//     if (result.length != 0) {
//       res.status(400).json({ message: "email already exist" });
//     } else {
//       let hashed = await hashPassword(req.body.password_hash);
//       await knex("users")
//         .insert({ email: req.body.email, password_hash: hashed, tel: req.body.tel })
//         .catch((e: any) => console.error(e))
//         .then(() => {});
//       res.json({ message: "success register" });
//     }
//   }
// });
