import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email", 256).unique().notNullable;
    table.string("password_hash",2048).notNullable;
    table.specificType("tel", "char(8)");
    table.timestamps(false, true);
    table.string("id_card",10).unique()
    table.string("driving_license",10).unique()
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
