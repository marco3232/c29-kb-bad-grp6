import { Knex } from "knex";
import { HttpError } from "./http.error";
import { comparePassword, hashPassword } from "./hash";

export class UserService {
  constructor(private knex: Knex) {}

  public async login(input: {
    email?: string;
    password: string;
  }): Promise<{ id: number }> {
    let users = await this.knex("users")
      .select("id", "password_hash")
      .where({ email: input.email })
      .first();
    if (!users) throw new HttpError(404, "user not found");
    let is_matched = await comparePassword({
      password: input.password,
      password_hash: users.password_hash,
    });
    console.log("check service ts", input);
    if (!is_matched) throw new HttpError(401, "wrong email or password");

    return { id: users.id };
  }

  public async register(input: {
    email?: string;
    password: string;
    tel: number;
  }): Promise<{ message: string }> {
    let users = await this.knex("users")
      .select("id")
      .where("email", input.email);
    console.log("want check users select", users);
    if (users.length != 0) {
      throw new HttpError(409, "email already exist");
    } else {
      let hashed = await hashPassword(input.password);
      await this.knex("users")
        .insert({ email: input.email, password_hash: hashed, tel: input.tel })
        .catch((e: any) => console.error(e))
        .then(() => {});
    }
    return { message: "User registration successful" };
  }

  public async tripplan(input: {
    routes: number;
    name: string;
    description: string;
    carpark_name: string;
    carpark_link: string;
    capacity: string;
  }): Promise<{ message: string }> {
    await this.knex("tripplans")
      .insert({
        routes: input.routes,
        name: input.name,
        description: input.description,
        carparkname: input.carpark_name,
        carparklink: input.carpark_link,
        capacity: input.capacity,
      })
      .catch((error) => {
        console.error("Error sending data to Python server:", error.message);
      });
    return { message: "tripplan done" };
  }
}
