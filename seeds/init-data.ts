import { Knex } from "knex";
import { hashPassword } from "../hash";
import { seedData } from "../genericSeed";

export async function seed(knex: Knex): Promise<void> {
  let dummyUser: { email: string; password_hash: string } = {
    email: "test@gmail.com",
    password_hash: "1234",
  };

  let processedData = {
    email: dummyUser.email,
    password_hash: await hashPassword(dummyUser.password_hash),
  };

  await seedData(
    knex,
    "users",
    { email: processedData.email },
    { password_hash: processedData.password_hash }
  );
}
