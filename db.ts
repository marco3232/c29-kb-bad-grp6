import Knex from "knex";
import { env } from "./env";

export function createKnex() {
  let config = require("./knexfile");
  let profile = config[env.NODE_ENV];

  console.log("check node env",env.NODE_ENV)
  let knex = Knex(profile);
  return knex;
}

export const knex = createKnex();
