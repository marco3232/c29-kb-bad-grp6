import { Router } from "express";
import { knex } from "../db";
import { Request, Response } from "express";

export const tripRoute = Router();

tripRoute.get("/hot-picks", async (req: Request, res: Response) => {
  let hotPicks = await knex.select("*").from("cars").limit(4);
  console.log("hotPicks", hotPicks);
  res.json(hotPicks);
});

tripRoute.get("/tripplan_result", async (req: Request, res: Response) => {
  console.log("user id ", req.session.id);
  const result = await knex
    .select("*")
    .from("tripplans")
    .orderBy("id", "desc")
    .limit(3);
  res.json(result);
  console.log("DB Result", result);
});

tripRoute.post("/insert_tripplan", async (req: Request, res: Response) => {
  console.log("user id ", req.session.user?.id, req.session.user?.email);
  res.send("insert completed")
});
