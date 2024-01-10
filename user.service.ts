import { Knex } from "knex";
import { HttpError } from "./http.error";
import { comparePassword } from "./hash";


export class UserService {
  constructor(private knex: Knex) {}

  public async login(input: {
    email?: string;
    password: string;
  }): Promise<{ id: number }> {
    let users = await this.knex("users")
      .select('id', 'password_hash')
      .where({ email: input.email })
      .first();
    if (!users) throw new HttpError(404, "user not found");
    let is_matched = await comparePassword({
      password: input.password,
      password_hash: users.password_hash,
    });
    console.log("check service", input);
    console.log("check email", input.email)
    if (!is_matched) throw new HttpError(401, "wrong email or password");

    return { id: users.id };
  }
}

